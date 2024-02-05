import { Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePage = this.page.getByRole('link', { name: '🦎 GAD' });

  constructor(private page: Page) {}
}
