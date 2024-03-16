import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify article', () => {
  test('Non logged user can access created article @GAD-R06-01 @predefined_data', async ({
    articlePage,
  }) => {
    // Arrange
    const expectArticleTitle = /How to write effective test cases.*/;
    const parameters = '?id=1';

    // Act
    await articlePage.goto(`${parameters}`);

    // Assert
    await expect(articlePage.articleTitle).toHaveText(expectArticleTitle);
  });
});
