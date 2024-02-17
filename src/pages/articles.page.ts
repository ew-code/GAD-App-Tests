import { MainMenuComponent } from '../components/main-menu.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');

  constructor(protected page: Page) {
    super(page);
  }
}
