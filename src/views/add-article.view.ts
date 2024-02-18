import { AddArticleModel } from '../models/article.model';
import { Page } from '@playwright/test';

export class ArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyText = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

  alertPopUp = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(addArticle: AddArticleModel): Promise<void> {
    await this.titleInput.fill(addArticle.title);
    await this.bodyText.fill(addArticle.body);
    await this.saveButton.click();
  }
}
