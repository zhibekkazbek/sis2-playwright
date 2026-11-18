import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly cartProduct: Locator;
  readonly cartPrice: Locator;
  readonly paymentSuccess: Locator;
  readonly orderConfirmation: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.getByText('Slip Joint Pliers', {
      exact: true,
    });

    this.productPrice = page.getByText('$9.17', {
      exact: true,
    }).first();

    this.cartProduct = page.getByRole('row').filter({
      hasText: 'Slip Joint Pliers',
    });

    this.cartPrice = this.cartProduct.getByText('$9.17', {
      exact: true,
    }).first();

    this.paymentSuccess = page.getByText(
      'Payment was successful',
      { exact: true },
    );

    this.orderConfirmation = page.getByText(
      /Thanks for your order!\s+Your invoice number is\s+INV-\d+\s*\./,
    );
  }

  async openProduct(): Promise<void> {
    await this.page.getByTestId('nav-home').click();

    await this.page.getByText('Slip Joint Pliers', {
      exact: true,
    }).click();
  }

  async addToCart(): Promise<void> {
    await this.page.getByTestId('add-to-cart').click();
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId('nav-cart').click();
  }

  async proceedToBilling(): Promise<void> {
    await this.page.getByTestId('proceed-1').click();
    await this.page.getByTestId('proceed-2').click();
  }

  async completeBillingAddress(address: {
    country: string;
    houseNumber: string;
    postalCode: string;
  }): Promise<void> {
    const country = this.page.getByTestId('country');
    const postalCode = this.page.getByTestId('postal_code');
    const houseNumber = this.page.getByTestId('house_number');
    const street = this.page.getByTestId('street');
    const city = this.page.getByTestId('city');
    const state = this.page.getByTestId('state');

    // Clear the previous address before triggering a new lookup.
    await postalCode.fill('');
    await houseNumber.fill('');
    await country.selectOption(address.country);
    await street.fill('');
    await city.fill('');
    await state.fill('');

    await postalCode.fill(address.postalCode);
    await houseNumber.fill(address.houseNumber);
    await houseNumber.press('Tab');

    // Keep the address returned by the site's lookup service.
    await expect(street).toHaveValue(/\S+/);
    await expect(city).toHaveValue(/\S+/);
    await expect(state).toHaveValue(/\S+/);

    await this.page.getByTestId('proceed-3').click();
  }

  async selectCashOnDelivery(): Promise<void> {
    await this.page.getByTestId('payment-method')
      .selectOption('cash-on-delivery');
  }

  async checkPayment(): Promise<void> {
    await this.page.getByTestId('finish').click();
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByTestId('finish').click();
  }
}
