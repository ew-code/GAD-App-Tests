import prepareRandomComment from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { AddCommentModel } from '@_src/models/comment.model';

test.describe('Create, verify and delete comment', () => {
  // let articlesPage: ArticlesPage;
  // let articlePage: ArticlePage;
  // let addArticleView: ArticleView;
  // let loginPage: LoginPage;
  // let articleData: AddArticleModel;
  // let addCommentView: AddCommentView;
  // let commentPage: CommentPage;
  // let editCommentView: EditCommentView;

  // test.beforeEach(async ({ createRandomArticle }) => {
  // loginPage = new LoginPage(page);
  // const articlesPage = new ArticlesPage(page);
  // const addArticleView = new ArticleView(page);
  // articlePage = new ArticlePage(page);
  // addCommentView = new AddCommentView(page);
  // commentPage = new CommentPage(page);
  // editCommentView = new EditCommentView(page);

  // articleData = prepareRandomArticle();

  // await loginPage.goto();
  // await loginPage.login(testUser1);
  // await articlesPage.goto();
  // const addArticleView = await articlesPage.clickAddArticleButtonLogged();
  // articlePage = createRandomArticle;
  // });

  test('operate on comments @GAD-R05-01 @GAD-R05-02 @logged', async ({
    createRandomArticle,
  }) => {
    const newCommentData = prepareRandomComment();
    let articlePage = createRandomArticle.articlePage;

    await test.step('create new comment', async () => {
      //Arrange
      const expectedAddCommentHeader = 'Add New Comment';
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      articlePage = await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(articlePage.alertPopUp)
        .toHaveText(expectedCommentCreatedPopup);
    });

    let commentPage = await test.step('verify comment', async () => {
      //Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      // await articleComment.link.click();
      const commentPage = await articlePage.clickCommentLink(articleComment);

      //Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);

      return commentPage;
    });

    let editCommentData: AddCommentModel;
    await test.step('update comment', async () => {
      //Arrange
      const expectedCommentEditedPopup = 'Comment was updated';
      editCommentData = prepareRandomComment();

      //Act
      const editCommentView = await commentPage.clickEditButton();
      commentPage = await editCommentView.updateComment(editCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toContainText(expectedCommentEditedPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('verify updated comment', async () => {
      //Act
      const articlePage = await commentPage.clickReturnLink();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );

      //Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });

    await test.step('create and verify second comment', async () => {
      //Arrange
      const secondCommentData = prepareRandomComment();

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      // await articlePage.addCommentButton.click();
      articlePage = await addCommentView.createComment(secondCommentData);

      //Assert
      const articleComment = articlePage.getArticleComment(
        secondCommentData.body,
      );
      await expect(articleComment.body).toHaveText(secondCommentData.body);
    });
  });

  test('user can add more than one comment to article @GAD-R05-03 @logged', async ({
    createRandomArticle,
  }) => {
    let articlePage = createRandomArticle.articleData;
    await test.step('create first comment', async () => {
      //Arrange
      const expectedCommentCreatedPopup = 'Comment was created';
      const newCommentData = prepareRandomComment();

      //Act
      // await articlePage.addCommentButton.click();
      const addCommentView = await articlePage.clickAddCommentButton();
      articlePage = await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(articlePage.alertPopUp)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('create and verify second comment', async () => {
      const secondCommentBody =
        await test.step('create and verify second comment', async () => {
          const secondCommentData = prepareRandomComment();
          // await articlePage.addCommentButton.click();
          const addCommentView = await articlePage.clickAddCommentButton();
          articlePage = await addCommentView.createComment(secondCommentData);
          return secondCommentData.body;
        });

      await test.step('create and verify second comment', async () => {
        const articleComment = articlePage.getArticleComment(secondCommentBody);
        await expect(articleComment.body).toHaveText(secondCommentBody);
      });
    });
  });
});
