import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly name: Locator;
  readonly price: Locator;

  constructor(private readonly page: Page) {
    this.name = page.getByTestId('product-name');
    this.price = page.getByTestId('unit-price');
  }

  async getPriceInCents(): Promise<number> {
    // Ждём числовую цену, а не читаем ещё пустой элемент.
    await expect(this.price).toHaveText(
      /^\s*\$?\s*\d+\.\d{2}\s*$/,
    );

    const text = (await this.price.innerText()).trim();
    const match = text.match(/^\$?\s*(\d+)\.(\d{2})$/);

    if (!match) {
      throw new Error(`Unexpected price format: "${text}"`);
    }

    return Number(match[1]) * 100 + Number(match[2]);
  }
}