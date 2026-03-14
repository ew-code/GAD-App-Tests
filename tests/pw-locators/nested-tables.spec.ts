import { expect, test } from '@playwright/test';

test.describe('Locator filters and nested table', () => {
  // https://playwright.dev/docs/locators#locator-operators
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-nested-table-v1.html');
  });
  test('Click selected button using getByRole', async ({ page }) => {
    // we expect to get the following output on console:
    // You clicked the button! (row 2-1-2)
    // Arrange:
    const expectedMessage = 'You clicked the button! (row 2-1-2)';
    const resultsTestId = 'dti-results';
    const buttonRole = 'button';
    const rowRole = 'row';
    const firstRowText = 'Row 2.0';
    const secondRowText = 'Row 1';
    const thirdRowText = 'Row 2';
    const resultsLocator = page.getByTestId(resultsTestId);
    const buttonLocator = page
      .getByRole(rowRole, { name: firstRowText })
      .getByRole(rowRole, { name: secondRowText })
      .getByRole(rowRole, { name: thirdRowText })
      .getByRole(buttonRole);
    // Act:
    await buttonLocator.click();
    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test('Click Z buttons using filter', async ({ page }) => {
    // we expect to get the following output on console:
    // You clicked the button! (row 1-3)
    // You clicked the button! (row 2-3)
    // You clicked the button! (row 3-3)
    // Arrange:
    const resultsTestId = 'dti-results';
    const siblingValue = 'Z';
    const buttonRole = 'button';
    const rowRole = 'row';
    const expectedMessages = {
      0: 'You clicked the button! (row 1-3)',
      1: 'You clicked the button! (row 2-3)',
      2: 'You clicked the button! (row 3-3)',
    };
    const resultsLocator = page.getByTestId(resultsTestId);
    const buttonLocator = page
      .getByRole(rowRole)
      .filter({
        has: page.getByText(siblingValue, { exact: true }),
        hasNot: page.getByText('Y', { exact: true }),
      })
      .getByRole(buttonRole);
    const numberOfButtons = await buttonLocator.count();
    for (let i = 0; i < numberOfButtons; i++) {
      // Act:
      await buttonLocator.nth(i).click();
      // Assert:
      await expect.soft(resultsLocator).toHaveText(expectedMessages[i]);
    }
  });
});
