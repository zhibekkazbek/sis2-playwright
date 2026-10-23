import { test, expect } from '../fixtures/pages.fixture';

test(
  'RESET-01: a known email displays the current reset confirmation',
  async ({ resetPasswordPage, registeredUser }, testInfo) => {
    testInfo.annotations.push({
      type: 'known-ui-issue',
      description:
        'The confirmation displays an untranslated key: ' +
        'page.forgot-password.confirm. ' +
        'This test does not verify email delivery or password change.',
    });

    await resetPasswordPage.open();
    await resetPasswordPage.fillEmail(registeredUser.email);
    await resetPasswordPage.submit();

    await expect(
      resetPasswordPage.confirmation,
    ).toBeVisible();
  },
);

test(
  'RESET-02: a malformed email is invalid and shows no confirmation',
  async ({ resetPasswordPage }) => {
    await resetPasswordPage.open();
    await resetPasswordPage.fillEmail('invalid-email');

    await expect(resetPasswordPage.email)
      .toHaveValue('invalid-email');

    await expect
      .poll(
        () => resetPasswordPage.isEmailValid(),
        {
          message: 'A malformed email must fail field validation',
        },
      )
      .toBe(false);

    await resetPasswordPage.submit();

    await expect(
      resetPasswordPage.confirmation,
    ).not.toBeVisible();

    await expect
      .poll(() => resetPasswordPage.isEmailValid())
      .toBe(false);
  },
);