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
    await addArticleView.titleInput.fill('Test article about playwright');
    await addArticleView.bodyText.fill(
      'Playwright also offers a range of innovative features that make writing tests more flexible and powerful than ever before. For example, the ability to test user interactions with the keyboard and mouse, emulate touch device movements, and support multi-threaded testing are just some of the features that make Playwright such a unique tool.',
    );
    await addArticleView.saveButton.click();

    await expect.soft(addArticleView.header).toBeVisible();
  });
});
