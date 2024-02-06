import { MainMenuComponent } from '../components/main-menu.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class WelcomePage extends BasePage {
  url = '/welcome';
  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
