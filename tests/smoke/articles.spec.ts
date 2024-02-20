import randomNewArticle from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
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
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new ArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    articleData = randomNewArticle();
  });

  test('create new article @GAD-R04-01', async ({ page }) => {
    // Arrange
    const articlePage = new ArticlePage(page);

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toContainText(articleData.body, { useInnerText: true });
  });

  test('reject creating article without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorText = 'Article was not created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();
    articleData.title = '';
    await addArticleView.saveButton.click();

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject creating article without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorText = 'Article was not created';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();

    articleData.body = '';
    await addArticleView.saveButton.click();

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });

  test('reject without body @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    articleData.body = '';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });

  test('reject without title @GAD-R04-01', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    articleData.title = '';

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });
});
