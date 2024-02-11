import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  passwordInput = this.page.getByTestId('password-input');

  registerButton = this.page.getByTestId('register-button');

  constructor(protected page: Page) {
    super(page);
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }
}
