import { RESPONSE_TIMEOUT } from '@_pw-config';
import prepareRandomComment from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify comment', () => {
  test('should return created comment @GAD-R07-06 @logged', async ({
    createRandomArticle,
    page,
  }) => {
    // Arrange
    const expectedCommentCreatedPopup = 'Comment was created';

    const newCommentData = prepareRandomComment();

    const responsePromise = page.waitForResponse(
      (response) => {
        // console.log(
        // response.request().method(),
        // response.url(),
        // response.status(),
        // );
        return (
          response.url().includes('/api/comments') &&
          response.status() == 200 &&
          response.request().method() == 'GET'
        );
      },
      { timeout: RESPONSE_TIMEOUT },
    );

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
