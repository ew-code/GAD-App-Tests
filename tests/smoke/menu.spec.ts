import { Pages } from '@_src/models/pages.model';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

const test = baseTest.extend<Pages>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    // await use(new ArticlesPage(page));
    await use(articlesPage);
  },

  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();
    await use(commentsPage);
  },
});

test.describe('Verify main menu buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    // const articlesPage = new ArticlesPage(page);
    // const commentsPage = new CommentsPage(page);

    // Act
    // await articlesPage.goto();
    // await articlesPage.mainMenu.commentsButton.click();
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    commentsPage,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    // const commentsPage = new CommentsPage(page);
    // const articlesPage = new ArticlesPage(page);

    // Act
    // await commentsPage.goto();
    // await commentsPage.mainMenu.articlesButton.click();
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates to main page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    // const articlesPage = new ArticlesPage(page);
    // const homePage = new HomePage(page);

    // Act
    // await articlesPage.goto();
    // await articlesPage.mainMenu.homePage.click();
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
