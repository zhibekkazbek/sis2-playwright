import type { Locator, Page } from '@playwright/test';

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
      /Thanks for your order! Your invoice number is INV-\d+\./,
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
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }): Promise<void> {
    await this.page.getByTestId('postal_code')
      .fill(address.postalCode);

    await this.page.getByTestId('house_number')
      .fill(address.houseNumber);

    await this.page.getByTestId('street')
      .fill(address.street);

    await this.page.getByTestId('city')
      .fill(address.city);

    await this.page.getByTestId('state')
      .fill(address.state);

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