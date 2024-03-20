// import { LoginPage } from '@_src/pages/login.page';
import { RESPONSE_TIMEOUT } from '@_pw-config';
import prepareRandomArticle from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles', () => {
  // let articlesPage: ArticlesPage;
  // let addArticleView: ArticleView;
  // let loginPage: LoginPage;

  // test.beforeEach(async ({ addArticleView, articlesPage }) => {
  // loginPage = new LoginPage(page);
  // articlesPage = new ArticlesPage(page);
  // addArticleView = new ArticleView(page);
  //
  // await loginPage.goto();
  // await loginPage.login(testUser1);

  // const sessionData = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
  // await page.context().addCookies(sessionData.cookies);
  // await page.context().storageState(sessionData.localStorage);

  // await articlesPage.goto();
  // addArticleView = await articlesPage.clickAddArticleButtonLogged();
  // await expect.soft(addArticleView.addNewHeader).toBeVisible();
  // });

  // test('reject creating article without title @GAD-R04-01', async () => {
  // Arrange
  // const expectedErrorText = 'Article was not created';

  // Act
  // await articlesPage.addArticleButtonLogged.click();
  // await expect.soft(addArticleView.header).toBeVisible();
  // const articleData = randomNewArticle();
  // articleData.title = '';
  // await addArticleView.saveButton.click();

  // Assert
  // await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  // });

  // test('reject creating article without body @GAD-R04-01', async () => {
  // Arrange
  // const expectedErrorText = 'Article was not created';

  // Act
  // await expect.soft(addArticleView.header).toBeVisible();
  // const articleData = randomNewArticle();
  // articleData.body = '';
  // await addArticleView.saveButton.click();

  // Assert
  // await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  // });

  test('reject creating article without body @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticle();
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without title @GAD-R04-01 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseCode = 422;
    const articleData = prepareRandomArticle();
    articleData.title = '';

    const responsePromise = page.waitForResponse('/api/articles', {
      timeout: RESPONSE_TIMEOUT,
    });
    // Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe('title length', () => {
    test('reject with title exceeding 128 signs @GAD-R04-02 @logged', async ({
      addArticleView,
    }) => {
      // Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle(129);

      // Act
      await addArticleView.createArticle(articleData);

      // Assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    });

    test('create new article with title 128 signs @GAD-R04-02 @logged', async ({
      addArticleView,
    }) => {
      // Arrange
      // const articlePage = new ArticlePage(page);
      const expectedErrorMessage = 'Article was created';
      const articleData = prepareRandomArticle(128);

      // Act
      const articlePage = await addArticleView.createArticle(articleData);

      // Assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
