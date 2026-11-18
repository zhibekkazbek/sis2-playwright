import { test, expect } from '../fixtures/pages.fixture';

test(
  'BUY-01: customer orders Slip Joint Pliers with cash on delivery',
  async ({
    page,
    loginPage,
    checkoutPage,
    registeredUser,
  }) => {
    await test.step('Sign in with a new test account', async () => {
      await loginPage.open();
      await loginPage.signIn(registeredUser);

      await expect(page).toHaveURL(
        /\/account\/?(?:[?#].*)?$/,
      );
    });

    await test.step('Open and verify the product', async () => {
      await checkoutPage.openProduct();

      await expect(checkoutPage.productName).toBeVisible();
      await expect(checkoutPage.productPrice).toBeVisible();
    });

    await test.step('Add the product and verify the cart', async () => {
      await checkoutPage.addToCart();
      await checkoutPage.openCart();

      await expect(checkoutPage.cartProduct).toHaveCount(1);
      await expect(checkoutPage.cartPrice).toBeVisible();
    });

    await test.step('Complete the billing address', async () => {
      await checkoutPage.proceedToBilling();
      await checkoutPage.completeBillingAddress(registeredUser);
    });

    await test.step('Check cash-on-delivery payment', async () => {
      await checkoutPage.selectCashOnDelivery();
      await checkoutPage.checkPayment();

      await expect(checkoutPage.paymentSuccess).toBeVisible();
    });

    await test.step('Confirm the order', async () => {
      await checkoutPage.confirmOrder();

      await expect(checkoutPage.orderConfirmation).toBeVisible();
    });
  },
);