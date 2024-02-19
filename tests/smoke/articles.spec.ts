import randomNewArticle from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify aricles', () => {
  test('create new article @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    const addArticleView = new ArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();
    const articleData = randomNewArticle();

    await addArticleView.createArticle(articleData);

    // Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('reject creating article without title @GAD-R04-01', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const expectedErrorText = 'Article was not created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    const addArticleView = new ArticleView(page);

    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    articleData.title = '';

    await addArticleView.saveButton.click();

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject creating article without body @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const expectedErrorText = 'Article was not created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    const addArticleView = new ArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    articleData.body = '';
    await addArticleView.saveButton.click();
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject sample @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new ArticleView(page);
    const articleData = randomNewArticle();
    articleData.body = '';

    const expectedErrorMessage = 'Article was not created';
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });
});
