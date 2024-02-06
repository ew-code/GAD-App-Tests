import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/Login';

  constructor(protected page: Page) {
    super(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Enter User Email').fill(email);
    await this.page.getByPlaceholder('Enter Password').fill(password);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
}
