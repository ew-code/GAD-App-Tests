import randomNewArticle from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify aricles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: ArticleView;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new ArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });

  test('reject creating article without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorText = 'Article was not created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();
    const articleData = randomNewArticle();
    articleData.title = '';
    await addArticleView.saveButton.click();

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject creating article without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorText = 'Article was not created';

    // Act
    await expect.soft(addArticleView.header).toBeVisible();
    const articleData = randomNewArticle();
    articleData.body = '';
    await addArticleView.saveButton.click();

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('reject without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.title = '';

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test.describe('title length', () => {
    test('reject with title exceeding 128 signs @GAD-R04-02', async () => {
      // Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = randomNewArticle(129);

      // Act
      await addArticleView.createArticle(articleData);

      // Assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    });

    test('create new article with title 128 signs @GAD-R04-02', async ({
      page,
    }) => {
      // Arrange
      const articlePage = new ArticlePage(page);
      const expectedErrorMessage = 'Article was created';
      const articleData = randomNewArticle(128);

      // Act
      await addArticleView.createArticle(articleData);

      // Assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
