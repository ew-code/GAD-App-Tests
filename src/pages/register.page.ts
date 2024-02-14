import { RegisterUser } from '../models/user.models';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  passwordInput = this.page.getByTestId('password-input');

  registerButton = this.page.getByTestId('register-button');
  alertPopUp = this.page.getByTestId('alert-popup');

  constructor(protected page: Page) {
    super(page);
  }

  async register(registerUserData: RegisterUser): Promise<void> {
    await this.firstNameInput.fill(registerUserData.firstName);
    await this.lastNameInput.fill(registerUserData.lastName);
    await this.emailInput.fill(registerUserData.email);
    await this.passwordInput.fill(registerUserData.password);
    await this.registerButton.click();
  }
}
