import type { Page } from '@playwright/test';
import type { RegistrationUser } from '../data/user.factory';

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');

    await this.page.getByTestId('nav-sign-in').click();
    await this.page.getByTestId('register-link').click();
  }

  async fillForm(user: RegistrationUser): Promise<void> {
    await this.page.getByTestId('first-name').fill(user.firstName);
    await this.page.getByTestId('last-name').fill(user.lastName);
    await this.page.getByTestId('dob').fill(user.dateOfBirth);

    await this.page.getByTestId('country').selectOption(user.country);
    await this.page.getByTestId('postal_code').fill(user.postalCode);
    await this.page.getByTestId('house_number').fill(user.houseNumber);
    await this.page.getByTestId('street').fill(user.street);
    await this.page.getByTestId('city').fill(user.city);
    await this.page.getByTestId('state').fill(user.state);

    await this.page.getByTestId('phone').fill(user.phone);
    await this.page.getByTestId('email').fill(user.email);
    await this.page.getByTestId('password').fill(user.password);
  }

  async submit(): Promise<void> {
    await this.page.getByTestId('register-submit').click();
  }
}