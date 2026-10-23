# Manual Test Results

Application: https://practicesoftwaretesting.com/

## REG-01 — Register a new account

### Preconditions
- The user is logged out.
- A unique, unregistered email address is available.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Click Register your account.
4. Fill in the registration form with personal data.
5. Submit the registration form.

### Expected Result
The account is created successfully. The application indicates completion through a confirmation message or navigation to the appropriate page.

### Actual Result
No successful-registration message appeared.
The resulting page and whether the account was created were not recorded.

### Status
Needs investigation. The absence of a success message alone does not establish that registration failed.

### Evidence
../sis2-playwright/screenshots/REG-01 Form.png

---

## LOGIN-01 — Log in with valid credentials

### Preconditions
- A registered account exists.
- The user is logged out.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Enter the valid email and password of an existing account.
4. Click Login.

### Expected Result
The user is authenticated and the account page displays the correct personal information.

### Actual Result
The account page opened and displayed the correct personal information.

### Status
Passed.

### Evidence
../sis2-playwright/screenshots/LOGIN-01 Success.png

---

## LOGIN-02 — Log in with invalid credentials

### Preconditions
- A registered account exists.
- The user is logged out.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Enter the email of an existing account and an incorrect password.
4. Click Login.

### Expected Result
Authentication is rejected, and an error message is displayed.

### Actual Result
The user was not logged in.
The following message appeared: "Invalid email or password".

### Status
Passed.

### Evidence
../sis2-playwright/screenshots/LOGIN-02.png

---

## BUY-01 — Buy a product

### Preconditions
- A registered account exists.
- A product is available for purchase.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Enter valid credentials.
4. Click Login.
5. Verify that the account page displays the correct personal information.
6. Navigate to the Home page.
7. Open an available product.
8. Click Add to cart.
9. Observe the confirmation that the product was added to the cart.
10. Open the cart.
11. Check the cart contents and click Proceed to checkout.
12. Review the sign-in information in the second checkout step.
13. Click Proceed to checkout.
14. Fill in the Billing address fields in the third step.
15. Click Proceed to checkout.
16. Select a payment method.
17. Click Check payment.
18. Observe the payment result.
19. Click Confirm.

### Expected Result
The cart contains the selected product with the correct quantity and price.
The billing information matches the entered data.
After successful payment and confirmation, the order is created and an order confirmation is displayed.

### Actual Result
- A confirmation appeared after adding the product to the cart.
- Incorrect autofill behaviour was observed after entering the country and postal code.
- The message "Payment was successful" appeared.
- Clicking Confirm produced no visible response.
- No order confirmation was observed. Order creation was not independently verified.

### Status
Failed: the expected order confirmation was not observed.

### Follow-up
Record the affected billing fields, entered and autofilled values, payment method, and the time spent waiting after clicking Confirm.
Check order history to determine whether an order was created.

### Evidence
../sis2-playwright/screenshots/BUY-01 0.png
../sis2-playwright/screenshots/BUY-01 1.png
../sis2-playwright/screenshots/BUY-01 2.png
../sis2-playwright/screenshots/BUY-01 3.png

---

## COMP-01 — Compare two products

### Preconditions
- A registered account exists.
- Slip Joint Pliers and Claw Hammer are available in the catalogue.

### Comparison Rule
Slip Joint Pliers must have a lower displayed price than Claw Hammer.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Enter valid credentials.
4. Click Login.
5. Verify that the account page displays the correct personal information.
6. Navigate to the Home page.
7. Open product A: Slip Joint Pliers.
8. Record its name and displayed price.
9. Return to the catalogue.
10. Open product B: Claw Hammer.
11. Record its name and displayed price.
12. Verify that the products have different names.
13. Compare their prices using the stated comparison rule.

### Expected Result
The selected products are different.
The displayed price of Slip Joint Pliers is lower than the displayed price of Claw Hammer.

### Actual Result
- Product A: Slip Joint Pliers — $9.17.
- Product B: Claw Hammer — $11.48.
- The product names are different.
- $9.17 < $11.48, so the comparison rule is satisfied.

### Status
Passed.

### Evidence
../sis2-playwright/screenshots/COMP-01 A.png
../sis2-playwright/screenshots/COMP-01 B.png

---

## RESET-01 — Request a password reset for a known email

### Preconditions
- The user is logged out.
- The email address belongs to an existing account in the tested environment.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Click Forgot your Password?
4. Enter the email address of the existing account.
5. Click Set New Password.

### Expected Result
The application accepts the request for the existing account and displays the confirmation defined for the password-reset flow.

### Actual Result
The following error appeared: "The selected email is invalid."

### Status
Needs investigation. Verify that the exact email address belongs to an existing account in the current environment.
If this precondition is confirmed, the observed result does not meet the expected result.

### Evidence
../sis2-playwright/screenshots/RESET-01.png

---

## RESET-02 — Enter a malformed email address

### Preconditions
- The user is logged out.
- A malformed email value is available.

### Steps
1. Open the application.
2. Navigate to the Sign in page.
3. Click Forgot your Password?
4. Enter an email address with an invalid format.
5. Observe the validation feedback.

### Expected Result
The application identifies the invalid email format and provides understandable validation feedback.

### Actual Result
A red rectangle appeared without any error-message text.
Submission behaviour was not recorded.

### Status
Needs investigation. The invalid state was indicated visually, but no explanatory text was observed.
Whether an invalid request could be submitted remains unverified.

### Evidence
../sis2-playwright/screenshots/RESET-02.png