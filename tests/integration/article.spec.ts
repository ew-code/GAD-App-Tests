import { ArticlePage } from '@_src/pages/article.page';
import { expect, test } from '@playwright/test';

test.describe('Verify article', () => {
  test('Non logged user can access created article @GAD-R06-01 @predefined_data', async ({
    page,
  }) => {
    // Arrange
    const expectArticleTitle = /How to write effective test cases.*/;
    const articlePage = new ArticlePage(page);
    const parameters = '?id=1';

    // Act
    await articlePage.goto(`${parameters}`);

    // Assert
    await expect(articlePage.articleTitle).toHaveText(expectArticleTitle);
  });
});
