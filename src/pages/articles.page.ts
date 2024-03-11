import { MainMenuComponent } from '@_src/components/main-menu.page';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { ArticleView } from '@_src/views/add-article.view';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  goButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  constructor(protected page: Page) {
    super(page);
  }

  async clickAddArticleButtonLogged(): Promise<ArticleView> {
    await this.addArticleButtonLogged.click();
    return new ArticleView(this.page);
  }

  async gotoArticle(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();
    return new ArticlePage(this.page);
  }

  async searchArticle(phrase: string): Promise<ArticlesPage> {
    await this.searchInput.fill(phrase);
    await this.goButton.click();
    return this;
  }
}
