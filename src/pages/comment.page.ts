import { MainMenuComponent } from '../components/main-menu.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');

  constructor(protected page: Page) {
    super(page);
  }
}
