# SIS 2 — Test automation with Playwright

## Objective

Automate five groups of user scenarios on https://practicesoftwaretesting.com/ using TypeScript and Playwright.

## Scope

Registration, login, purchasing a product, comparing product information, and password reset.

## Planned test cases

| ID | Scenario | Expected result |
|---|---|---|
| REG-01 | Register a customer with a unique email | Registration succeeds and the expected next page appears |
| LOGIN-01 | Log in with valid credentials | The account page opens |
| LOGIN-02 | Log in with invalid credentials | An error appears and access is denied |
| BUY-01 | Add a product and complete checkout | The cart contains the correct item and quantity; the order is confirmed |
| COMP-01 | Compare two products | Both names and numeric prices are captured and checked against the stated comparison rule |
| RESET-01 | Request a password reset for a known email | The agreed confirmation is displayed |
| RESET-02 | Submit a malformed email | Validation prevents an invalid request |

## Test Design

Tests use Page Objects, reusable fixtures, unique registration data, and web-first assertions.
Tests must run independently and must not depend on execution order.

## Items to Clarify

- Exact successful-registration destination.
- Password-reset response and validation rules.
- Product comparison rule and suitable test data.
- Checkout requirements and supported test payment flow.