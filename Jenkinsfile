pipeline {
    agent {
        label 'playwright'
    }

    parameters {
        choice(
            name: 'SHARDS',
            choices: ['1', '2'],
            description: '1 = baseline, 2 = parallel execution'
        )
    }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')

        buildDiscarder(logRotator(
            daysToKeepStr: '14',
            artifactDaysToKeepStr: '14'
        ))
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://practicesoftwaretesting.com'
        npm_config_cache = '/home/pwuser/.npm'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm

                stash(
                    name: 'source',
                    includes: '**/*',
                    excludes: 'node_modules/**,test-results/**,playwright-report/**,blob-report/**,all-blob-reports/**,reports/**,.git/**,.env,playwright/.auth/**'
                )
            }
        }

        stage('Playwright tests') {
            steps {
                script {
                    int total = (params.SHARDS ?: '1').toInteger()
                    def branches = [:]

                    for (int index = 1; index <= total; index++) {
                        def shard = index

                        branches["Shard ${shard}/${total}"] = {
                            stage("Shard ${shard}/${total}") {
                                dir("shard-${shard}") {
                                    catchError(
                                        buildResult: 'FAILURE',
                                        stageResult: 'FAILURE'
                                    ) {
                                        deleteDir()
                                        unstash 'source'

                                        sh 'npm ci --prefer-offline'
                                        sh 'npx playwright install'

                                        withEnv([
                                            "SHARD_INDEX=${shard}",
                                            "SHARD_TOTAL=${total}"
                                        ]) {
                                            sh '''
                                                mkdir -p reports test-results
                                                set +e

                                                started=$(date +%s)

                                                npx playwright test \
                                                  --shard="$SHARD_INDEX/$SHARD_TOTAL"

                                                result=$?
                                                finished=$(date +%s)

                                                echo "test_seconds=$((finished - started))" \
                                                  > reports/timing.txt

                                                exit "$result"
                                            '''
                                        }
                                    }
                                }
                            }
                        }
                    }

                    parallel branches
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'shard-*/playwright-report/**,shard-*/test-results/**,shard-*/reports/**',
                allowEmptyArchive: true
            )

            script {
                int total = (params.SHARDS ?: '1').toInteger()

                for (int shard = 1; shard <= total; shard++) {
                    def reportDir = "shard-${shard}/playwright-report"

                    if (fileExists("${reportDir}/index.html")) {
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: reportDir,
                            reportFiles: 'index.html',
                            reportName: "Playwright shard ${shard}"
                        ])
                    }
                }
            }

            junit(
                testResults: 'shard-*/reports/junit.xml',
                allowEmptyResults: false
            )
        }
    }
}