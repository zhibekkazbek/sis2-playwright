# SIS 3 - CI platform

This project uses Jenkins in Docker.

Jenkins was selected to demonstrate a self-hosted CI pipeline,
agent configuration, parallel execution and report publication.

## Environment

- Jenkins controller in Docker
- Separate Playwright agent in Docker
- Playwright version matching package-lock.json
- Persistent npm cache
- Two shards running on the same agent

## Triggers

The Multibranch Pipeline discovers branches and pull requests.
GitHub webhooks trigger builds for pushes and pull request events.

## Reports

Each shard publishes an HTML report, traces and JUnit XML.
Jenkins aggregates JUnit results.
Builds and artifacts are retained for 14 days.

## Limitations

The tested application is an external public demo.
TODO: describe availability of the Jenkins host and tunnel.
