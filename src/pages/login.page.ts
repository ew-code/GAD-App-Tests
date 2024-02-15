import { LoginUser } from '../../src/models/user.models';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  emailInput = this.page.getByPlaceholder('Enter User Email');
  passwordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  loginError = this.page.getByTestId('login-error');

  constructor(protected page: Page) {
    super(page);
  }

  async login(loginUser: LoginUser): Promise<void> {
    await this.emailInput.fill(loginUser.userEmail);
    await this.passwordInput.fill(loginUser.userPassword);
    await this.loginButton.click();
  }
}
