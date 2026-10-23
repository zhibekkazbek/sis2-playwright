import type { Page } from '@playwright/test';

export class CatalogPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async openProduct(name: string): Promise<void> {
    await this.page.getByText(name, { exact: true }).click();
  }
}