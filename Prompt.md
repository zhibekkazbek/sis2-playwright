# SIS 2 — AI Prompts and Usage

## 1. AI Tool

- Tool: OpenAI Codex.
- Model: GPT-6 Astra.
- Project language: TypeScript.
- Automation framework: Playwright.

Playwright Codegen was also used to record browser actions.
These recordings were provided to Codex for refactoring.

## 2. Conversation Context

The AI conversation included the manual test observations, Codegen recordings,
execution errors, and screenshots of test results.

## 3. Exact Text Requests

### Request 1 — Manual scenarios

```text
Пройди каждый сценарий вручную и запиши:
распиши пусть каждого сценария
```

### Request 2 — Project documentation

```text
нужен текст для prompt.md read.me
```

## 4. Code and Diagnostic Messages

Additional AI inputs consisted of:

- The registration Codegen recording.
- The login Codegen recording.
- The failed login execution log.
- Screenshots of the successful login runs after correction.
- The purchase Codegen recording and order-confirmation screenshot.
- The product-comparison Codegen recording.
- The password-reset Codegen recording.
- Screenshots of the individual test-file results.

These messages supplied the actual locators, observed behaviour,
and failure evidence used during implementation.

### Exact Code and Diagnostic Inputs

[Before submission, paste the actual Codegen and error-log
messages used in this conversation, or include them in clearly
referenced transcript files.]

If personal credentials are removed from a published transcript,
mark each replacement explicitly, for example:

[REDACTED PERSONAL PASSWORD]

A redacted copy must be identified as redacted rather than
described as an unchanged transcript.

## 5. AI Assistance and Human Review

Codex helped:

- Remove unnecessary Codegen actions.
- Structure code into Page Objects and fixtures.
- Generate unique test data.
- Add assertions.
- Diagnose the password-length validation failure.
- Draft project documentation.

The student performed manual exploration, recorded browser
actions, applied code changes, executed tests, and supplied
screenshots and failure logs.

Review.md documents the changes, verification results,
and remaining limitations.

## 6. Evidence

Test-result screenshots are stored
in the screenshots directory.

Test screenshots demonstrate execution results.