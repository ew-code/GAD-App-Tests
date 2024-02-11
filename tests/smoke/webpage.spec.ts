import { expect, test } from '@playwright/test';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';

test.describe('Verify service main pages', () => {
  test('home page title @GAD-R01-01', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

    // Assert
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('articles page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goto();

    // Assert
    const title = await articlesPage.title();
    expect(title).toContain('Articles');
  });

  test('comments page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goto();

    // Assert
    const title = await commentsPage.title();
    expect(title).toContain('Comments');
  });

  // test('home page title simple', async ({ page }) => {
  //   await page.goto('');
  //   await expect(page).toHaveTitle(/GAD/);
  });
// });
