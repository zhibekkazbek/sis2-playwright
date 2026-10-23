import type { Locator, Page } from '@playwright/test';

type Credentials = {
  email: string;
  password: string;
};

export class LoginPage {
  readonly invalidCredentialsMessage: Locator;

  constructor(private readonly page: Page) {
    this.invalidCredentialsMessage = page.getByText(
      'Invalid email or password',
      { exact: true },
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async signIn(user: Credentials): Promise<void> {
    await this.page.getByTestId('email').fill(user.email);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('login-submit').click();
  }
}