import { expect, test } from '@playwright/test';

test.describe('Finding elements using getByTestId and locators', () => {
  test.use({ testIdAttribute: 'pw-test' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-elements-custom-attribute.html');
  });

  test('click the button (using getByTestId)', async ({ page }) => {
    //Arrange:
    const butonTestId = 'simple-button';
    const resultsTestId = 'results';
    const expectedMessage = 'You clicked the button!';
    const buttonLocator = page.getByTestId(butonTestId);
    const resultsLocator = page.getByTestId(resultsTestId);

    //Act:

    await buttonLocator.click();

    //Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test('click the button (using locator)', async ({ page }) => {
    // Arrange:
    const buttonSelector = "[pw-test='simple-button']";
    const resultsSelector = "[pw-test='results']";
    const expectedMessage = 'You clicked the button!';
    const buttonLocator = page.locator(buttonSelector);
    const resultsLocator = page.locator(resultsSelector);

    // Act:
    await buttonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
