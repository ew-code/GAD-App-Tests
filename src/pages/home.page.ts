import { MainMenuComponent } from '@_src/components/main-menu.page';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '/';
  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
