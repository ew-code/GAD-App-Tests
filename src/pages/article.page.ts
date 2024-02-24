import { MainMenuComponent } from '../components/main-menu.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  articleTitle = this.page.locator('#title');
  articleBody = this.page.getByTestId('article-body');

  constructor(protected page: Page) {
    super(page);
  }
}
