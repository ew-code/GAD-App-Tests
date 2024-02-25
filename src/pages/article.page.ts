import { MainMenuComponent } from '../components/main-menu.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  articleTitle = this.page.locator('#title');
  articleBody = this.page.getByTestId('article-body');
  deleteIcon = this.page.getByTestId('delete');

  constructor(protected page: Page) {
    super(page);
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      // console.log('dialog is on!');
      await dialog.accept();
    });
    this.deleteIcon.click();
  }
}
