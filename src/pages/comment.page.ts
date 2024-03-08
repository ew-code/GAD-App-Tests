import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.page';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponent(this.page);
  commentBody = this.page.getByTestId('comment-body');
  editButton = this.page.getByTestId('edit');
  returnLink = this.page.getByTestId('return');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(protected page: Page) {
    super(page);
  }
}
