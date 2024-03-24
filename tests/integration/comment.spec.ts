import prepareRandomComment from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify comment', () => {
  test('should return created comment @GAD-R07-06 @logged', async ({
    createRandomArticle,
    page,
  }) => {
    // Arrange
    const expectedCommentCreatedPopup = 'Comment was created';

    const newCommentData = prepareRandomComment();

    const responsePromise = waitForResponse(page, '/api/comments', 'GET', 200);

    let articlePage = createRandomArticle.articlePage;
    const addCommentView = await articlePage.clickAddCommentButton();

    // Act
    articlePage = await addCommentView.createComment(newCommentData);
    const response = await responsePromise;

    // Assert
    await expect
      .soft(articlePage.alertPopUp)
      .toHaveText(expectedCommentCreatedPopup);
    expect(response.ok()).toBeTruthy();
  });
});
