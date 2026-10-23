import { test, expect } from '../fixtures/pages.fixture';
import { createRegistrationUser } from '../data/user.factory';

test(
  'REG-01: registration with valid data redirects to sign in',
  async ({ registerPage, page }) => {
    const user = createRegistrationUser();

    await registerPage.open();
    await registerPage.fillForm(user);
    await registerPage.submit();

    await expect(page).toHaveURL(
      /\/auth\/login\/?(?:[?#].*)?$/,
    );
  },
);