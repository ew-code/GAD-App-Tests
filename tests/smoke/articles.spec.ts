import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
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
    const title = await articlesPage.title();
    expect(title).toContain('Welcome');
  });
});
