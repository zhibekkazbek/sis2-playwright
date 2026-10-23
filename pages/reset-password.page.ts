import type { Locator, Page } from '@playwright/test';

export class ResetPasswordPage {
  readonly email: Locator;
  readonly confirmation: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByTestId('email');

    this.confirmation = page.getByText(
      'page.forgot-password.confirm',
      { exact: true },
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/login');
    await this.page.getByTestId('forgot-password-link').click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.email.fill(email);
  }

  async submit(): Promise<void> {
    await this.page.getByTestId('forgot-password-submit').click();
  }

  async isEmailValid(): Promise<boolean> {
    return this.email.evaluate((element) => {
      return (element as HTMLInputElement).validity.valid;
    });
  }
}