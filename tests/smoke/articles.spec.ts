import randomNewArticle from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticleView } from '../../src/views/add-article.view';
import { faker } from '@faker-js/faker/locale/pl';
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

  test('not create article with incorrect data - title not provided @GAD-R04-01', async ({
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
    await addArticleView.bodyText.fill(faker.lorem.paragraph(2));
    await addArticleView.saveButton.click();

    // Assert
    // const articlePage = new ArticlePage(page);

    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
    // await expect
    // .soft(articlePage.articleBody)
    // .toContainText(articleData.body, { useInnerText: true });
  });

  test('not create article with incorrect data - body not provided @GAD-R04-01', async ({
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
    await addArticleView.titleInput.fill(faker.lorem.sentence(1));
    await addArticleView.saveButton.click();

    // Assert
    // const articlePage = new ArticlePage(page);
    // await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    // await expect
    // .soft(articlePage.articleBody)
    // .toContainText(articleData.body, { useInnerText: true });
    await page.getByTestId('save').click();
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });
});
