# SIS 2 — Review of AI-Assisted Test Automation

## 1. Overview

This project automates five groups of scenarios on
https://practicesoftwaretesting.com/
using TypeScript and Playwright.

Playwright Codegen provided initial recordings of browser actions.
OpenAI Codex helped refactor these recordings into Page Objects,
fixtures, test-data factories, and tests with assertions.

The review process included examining the generated code,
running tests in Chromium, investigating failures, and checking
whether assertions matched the intended scenarios.

The exact prompts and AI tool details are documented in Prompt.md.

## 2. Registration — REG-01

### Initial Output

The Codegen recording contained repeated navigation, unnecessary
clicks, overwritten input values, and password-visibility actions.

It used personal data and did not check the registration result.

### Changes and Rationale

- Removed actions unrelated to the registration scenario.
- Moved page interactions into RegisterPage.
- Added a fixture to provide RegisterPage to the test.
- Replaced personal information with synthetic test data.
- Added a data factory that generates a unique email for each run.
- Added a URL assertion to verify redirection to the sign-in page.

Unique emails prevent repeated runs from failing because an
account already exists. The Page Object centralises interactions
and keeps locators out of the test file.

### Verification

REG-01 passed in Chromium with a visible browser.

- Test duration: 6.5 seconds.
- Total run duration: 8.0 seconds.

The assertion confirmed redirection to the sign-in page after
submitting the registration form.

### Limitations

REG-01 checks redirection but does not itself verify that the
new credentials can be used to log in.

LOGIN-01 separately verifies login using an account created
during its own setup.

### Evidence

- screenshots/test1.png
- screenshots/test1 report.png

## 3. Login — LOGIN-01 and LOGIN-02

### Initial Output

The Codegen recording contained two login attempts using
different email addresses and no assertions.

The first automated version generated passwords using a full UUID.

### Changes and Rationale

- Split successful and unsuccessful login into separate tests.
- Moved login interactions into LoginPage.
- Added a registeredUser fixture that creates a unique account
  for each test.
- Added an account-page URL assertion for successful login.
- Added an error-message assertion and a sign-in-page URL
  assertion for an incorrect password.

Each test prepares its own account and does not depend on
REG-01 or another test running first.

### Failure Investigation

Both tests initially failed.

The saved error-context.md files showed:
"Password length is invalid".

The generated password was 46 characters long. Appending
"-wrong" for the negative test increased its length to 52 characters.

The form rejected password length before the intended
authentication checks could complete.

### Correction

- Shortened generated passwords to 16 characters.
- Changed one character for the incorrect-password case instead
  of appending text.

This preserved the password length while making the password
different from the registered value.

The assertions remained unchanged because the observed failure
came from unsuitable test data.

### Verification

Both tests passed in Chromium using two parallel workers.

- LOGIN-01: 4.5 seconds.
- LOGIN-02: 4.6 seconds.
- Total run duration: 5.7 seconds.

### Limitations

The successful-login test verifies navigation to the account
page. It does not yet verify all displayed personal information.

Account preparation currently uses the UI, which adds execution time.

### Evidence

- screenshots/test2.png
- screenshots/test2 report.png

## 4. Purchase — BUY-01

### Initial Output

The Codegen recording contained unnecessary clicks, a generated
product ID, and a switch between two payment methods.

It clicked the final checkout control twice without checking
the intermediate payment result.

### Changes and Rationale

- Removed unrelated clicks.
- Selected Slip Joint Pliers by name instead of its generated ID.
- Kept Cash on Delivery as the payment method.
- Used a newly registered customer.
- Moved purchase interactions into CheckoutPage.
- Added named test steps to make failures easier to locate.
- Separated payment checking from order confirmation.

The test checks:

1. The product name and displayed price.
2. One matching product row in the cart and its displayed price.
3. The payment-success message.
4. The order-confirmation message containing an invoice number.

The invoice number is checked by its format rather than the
fixed number observed in the manual run.

### Verification

BUY-01 passed in Chromium.

- Test duration: 9.3 seconds.
- Total run duration: 10.2 seconds.

### Limitations

The cart assertion checks one matching product row.
It does not verify the quantity field or calculate the order total.

The expected price of $9.17 comes from the manual observation
and may need review if catalogue pricing changes.

### Evidence

- screenshots/test3.png
- screenshots/test3 report.png

## 5. Product Comparison — COMP-01

### Initial Output

The Codegen recording selected products using generated IDs
and clicked their names and prices without checking the values.

### Changes and Rationale

- Selected products by name instead of generated ID.
- Moved navigation into CatalogPage.
- Moved product locators and price reading into ProductPage.
- Verified the displayed names of both products.
- Waited for the expected price format before reading it.
- Converted prices to integer cents.
- Compared the prices using a predefined rule.
- Attached the captured names and prices to the test report.

The comparison rule is:

Slip Joint Pliers costs less than Claw Hammer.

Integer cents allow the comparison to use whole numbers.

### Verification

COMP-01 passed in Chromium.

Both names matched the selected products, and the captured
prices satisfied the comparison rule.

- Test duration: 5.1 seconds.
- Total run duration: 5.8 seconds.

### Limitations

The comparison rule is based on the selected catalogue data.
A future pricing change may require reviewing this assumption.

The price parser supports the observed dollar format with
two decimal places, not every currency or locale.

### Evidence

- screenshots/test4.png
- screenshots/test4 report.png

## 6. Password Reset — RESET-01 and RESET-02

### Initial Output

The Codegen recording contained password-reset actions mixed
with Google searches, CAPTCHA interactions, repeated clicks,
and references to an undeclared page1 variable.

### Changes and Rationale

- Removed unrelated browser actions.
- Moved reset-form interactions into ResetPasswordPage.
- Used a newly registered account for the known-email test.
- Separated the known-email case from malformed-email validation.
- Added an annotation documenting the observed confirmation-text issue.

The application displayed:
"page.forgot-password.confirm".

This appears to be an untranslated localization key. RESET-01
checks this currently observed marker and records the UI issue
rather than treating the wording as correct.

RESET-02 checks native email-field invalidity and the absence
of the confirmation marker after malformed input.

### Verification

Both tests passed in Chromium using two parallel workers.

- RESET-01: 5.0 seconds.
- RESET-02: 2.7 seconds.
- Total run duration: 5.9 seconds.

The run confirmed that the malformed value failed native
email-field validation.

### Limitations

- The untranslated confirmation remains a known UI issue.
- RESET-01 checks current interface behaviour, not correct
  user-facing confirmation wording.
- Email delivery was not tested.
- Reset-link handling and an actual password change were not tested.
- RESET-02 does not verify network-request suppression or
  the presence of an understandable validation message.

### Evidence

- screenshots/test5.png
- screenshots/test5 report.png

## 7. Execution Summary

The following results come from separate test-file runs.

| Group | Test Cases | Result | Total Run Duration |
|---|---|---|---|
| Registration | REG-01 | 1 passed | 8.0 seconds |
| Login | LOGIN-01, LOGIN-02 | 2 passed | 5.7 seconds |
| Purchase | BUY-01 | 1 passed | 10.2 seconds |
| Product comparison | COMP-01 | 1 passed | 5.8 seconds |
| Password reset | RESET-01, RESET-02 | 2 passed | 5.9 seconds |

All seven tests passed in their respective runs.

A combined run of all seven tests and repeated-run stability
verification are not yet documented here.

## 8. Review Conclusions

The initial recordings needed changes before they could serve
as meaningful automated tests. The main improvements were:

- Removing unrelated and repeated actions.
- Moving locators into Page Objects.
- Providing dependencies through fixtures.
- Generating independent test data.
- Adding assertions tied to the intended behaviour.
- Investigating failures using saved execution evidence.

The password-length failure demonstrated why AI-generated data
must be checked against application validation rules.

Passing results apply to the implemented assertions. They do
not establish complete coverage of the application or remove
the limitations documented above.