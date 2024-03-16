// import { LoginPage } from '@_src/pages/login.page';
// import { testUser1 } from '@_src/test-data/user.data';
import prepareRandomArticle from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { AddArticleModel } from '@_src/models/article.model';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  // let articlesPage: ArticlesPage;
  // let articlePage: ArticlePage;
  // let addArticleView: ArticleView;
  // let loginPage: LoginPage;
  let articleData: AddArticleModel;

  // test.beforeEach(async ({ page }) => {
  // loginPage = new LoginPage(page);
  // articlesPage = new ArticlesPage(page);
  // addArticleView = new ArticleView(page);
  // articlePage = new ArticlePage(page);

  // await loginPage.goto();
  // await loginPage.login(testUser1);
  // await articlesPage.goto();
  // });

  test('create new article @GAD-R04-01 @logged', async ({ addArticleView }) => {
    // Arrange
    articleData = prepareRandomArticle();

    // Act
    // const addArticleView = await articlesPage.clickAddArticleButtonLogged();
    // await expect.soft(addArticleView.addNewHeader).toBeVisible();
    const articlePage = await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('user can access single article @GAD-R04-03 @logged', async ({
    articlesPage,
  }) => {
    // Act
    const articlePage = await articlesPage.gotoArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('user can delete his own article @GAD-R04-04 @logged', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const expectedNoResultText = 'No data';
    const articlePage = await articlesPage.gotoArticle(articleData.title);

    // Act
    articlesPage = await articlePage.deleteArticle();

    // Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);

    articlesPage = await articlesPage.searchArticle(articleData.title);
    await expect(articlesPage.noResultText).toHaveText(expectedNoResultText);
  });
});
