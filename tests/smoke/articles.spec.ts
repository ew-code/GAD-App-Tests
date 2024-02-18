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
    await articlesPage.addArticleButtonLogged.click();
    const addArticleView = new ArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const newArticleTitle = 'Test article about playwright';
    const newArticleBody = 'Playwright test body';
    await addArticleView.titleInput.fill(newArticleTitle);
    await addArticleView.bodyText.fill(newArticleBody);
    await addArticleView.saveButton.click();
    const articlePage = new ArticlePage(page);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(newArticleTitle);
    await expect.soft(articlePage.articleBody).toContainText(newArticleBody);
  });
});
