import { Page } from '@playwright/test';

export class ArticleView {
  header = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  bodyText = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');

  constructor(private page: Page) {}
}
