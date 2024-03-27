import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @GAD-R08-01 @api', () => {
  test('GET articles returns status code 200', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 200;
    const articlesUrl = '/api/articles';
    // Act
    const response = await request.get(articlesUrl);
    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
});
