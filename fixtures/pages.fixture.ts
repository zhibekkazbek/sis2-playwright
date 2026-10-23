import { test as base } from '@playwright/test';

import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CatalogPage } from '../pages/catalog.page';
import { ProductPage } from '../pages/product.page';
import { ResetPasswordPage } from '../pages/reset-password.page';

import {
  createRegistrationUser,
  type RegistrationUser,
} from '../data/user.factory';

type AppFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  registeredUser: RegistrationUser;
  checkoutPage: CheckoutPage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  resetPasswordPage: ResetPasswordPage;
};

export const test = base.extend<AppFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registeredUser: async ({ registerPage, page }, use) => {
    const user = createRegistrationUser();

    await registerPage.open();
    await registerPage.fillForm(user);
    await registerPage.submit();

    await page.waitForURL(/\/auth\/login\/?(?:[?#].*)?$/);

    await use(user);
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  resetPasswordPage: async ({ page }, use) => {
    await use(new ResetPasswordPage(page)); 
  },
});

export { expect } from '@playwright/test';