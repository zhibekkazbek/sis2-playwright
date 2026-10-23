import { test, expect } from '../fixtures/pages.fixture';

test(
  'LOGIN-01: valid credentials open the account page',
  async ({ loginPage, registeredUser, page }) => {
    await loginPage.open();

    await loginPage.signIn({
      email: registeredUser.email,
      password: registeredUser.password,
    });

    await expect(page).toHaveURL(
      /\/account\/?(?:[?#].*)?$/,
    );
  },
);

test(
  'LOGIN-02: an incorrect password is rejected',
  async ({ loginPage, registeredUser, page }) => {
    await loginPage.open();

    await loginPage.signIn({
      email: registeredUser.email,
      password: registeredUser.password.replace(/^S/, 'X'),
    });

    await expect(
      loginPage.invalidCredentialsMessage,
    ).toBeVisible();

    await expect(page).toHaveURL(
      /\/auth\/login\/?(?:[?#].*)?$/,
    );
  },
);