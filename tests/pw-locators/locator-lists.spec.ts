import { expect, test } from '@playwright/test';

test.describe('Locator lists', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-multiple-elements-no-ids.html');
  });

  test('All buttons on page', async ({ page }) => {
    // Arrange:
    // const elementRole = 'button';
    const expectedButtonsCount = 1;
    const resultsTestId = 'dti-results';

    const buttonsLocator = page.getByRole('button', { name: 'Click here!' });
    const resultsLocator = page.getByTestId(resultsTestId);
    const expectedMessage = 'You clicked the button! (Third one!)';
    // console.log('Buttons count: ', await buttonsLocator.count());

    // Act:
    await buttonsLocator.click();

    // console.log('Results text: ', await resultsLocator.textContent());
    // Assert:
    await expect(buttonsLocator).toHaveCount(expectedButtonsCount);
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test('action on nth button', async ({ page }) => {
    // Arrange:
    const elementRole = 'button';
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button! (Second one!)';

    const buttonsLocator = page.getByRole(elementRole);
    const resultsLocator = page.getByTestId(resultsTestId);

    // Act:
    await buttonsLocator.nth(2).click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test('action on multiple buttons', async ({ page }) => {
    // Arrange:
    const elementRole = 'button';
    const resultsTestId = 'dti-results';
    const elementText = 'Click!';

    const buttonsLocator = page.getByRole(elementRole, { name: elementText });
    const resultsLocator = page.getByTestId(resultsTestId);

    const numberOfButtons = await buttonsLocator.count();
    for (let i = 0; i < numberOfButtons; i++) {
      await buttonsLocator.nth(i).click();
      //   console.log(await resultsLocator.textContent());
    }

    const allButtonsLocators = await buttonsLocator.all();
    for (const buttonLocator of allButtonsLocators) {
      await buttonLocator.click();
      //   console.log(await resultsLocator.textContent());
    }
    // Act:
    // await buttonsLocator.nth(0).click();
    // await buttonsLocator.nth(1).click();
    // await buttonsLocator.nth(2).click();

    // Assert:
    await expect(resultsLocator).toHaveText(
      `You clicked the button! (row ${numberOfButtons})`,
    );
  });
});
