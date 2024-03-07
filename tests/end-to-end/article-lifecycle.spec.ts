import prepareRandomArticle from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { ArticleView } from '../../src/views/add-article.view';
// import { LoginPage } from '../../src/pages/login.page';
// import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let articlePage: ArticlePage;
  let addArticleView: ArticleView;
  // let loginPage: LoginPage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new ArticleView(page);
    articlePage = new ArticlePage(page);

    // await loginPage.goto();
    // await loginPage.login(testUser1);
    await articlesPage.goto();
  });

  test('create new article @GAD-R04-01 @logged', async () => {
    // Arrange
    articleData = prepareRandomArticle();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('user can access single article @GAD-R04-03 @logged', async () => {
    // Act
    await articlesPage.gotoArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('user can delete his own article @GAD-R04-04 @logged', async () => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const expectedNoResultText = 'No data';
    await articlesPage.gotoArticle(articleData.title);

    // Act
    await articlePage.deleteArticle();

    // Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);

    await articlesPage.searchArticle(articleData.title);
    await expect(articlesPage.noResultText).toHaveText(expectedNoResultText);
  });
});
