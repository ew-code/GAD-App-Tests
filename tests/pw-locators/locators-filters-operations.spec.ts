import { expect, test } from '@playwright/test';

test.describe('Locator filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-multiple-elements-no-ids.html');
  });

  test.describe('Finding element - different approaches', () => {
    test('Single button click using options', async ({ page }) => {
      // TODO:
      // Arrange:
      const elementRole = 'button';
      const elementText = 'Click me!';
      const resultsTestId = 'dti-results';
      const expectedMessage = 'You clicked the button!';

      const buttonLocator = page.getByRole(elementRole, { name: elementText });
      const resultsLocator = page.getByTestId(resultsTestId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test('Single button click (using filter and hasText)', async ({ page }) => {
      // TODO:
      // Arrange:

      const elementRole = 'button';
      const elementText = 'Click me!';
      const resultsTestId = 'dti-results';
      const expectedMessage = 'You clicked the button!';

      const buttonLocator = page
        .getByRole(elementRole)
        .filter({ hasText: elementText });
      const resultsLocator = page.getByTestId(resultsTestId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });

  test.describe('Buttons in table - different approaches', () => {
    test('Single button click (chained getBy)', async ({ page }) => {
      // Arrange:
      const elementRole = 'button';
      const elementText = 'Click!';
      const parentRole = 'row';
      const parentText = 'Row 2';
      const resultsTestId = 'dti-results';
      const expectedMessage = 'You clicked the button! (row 2)';
      const resultsLocator = page.getByTestId(resultsTestId);

      const buttonLocator = page
        .getByRole(parentRole, { name: parentText })
        .getByRole(elementRole, { name: elementText });

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test('Single button click (using filter and has)', async ({ page }) => {
      // Arrange:
      const elementRole = 'button';
      const parentRole = 'row';
      const siblingText = 'Row 2';
      const expectedMessage = 'You clicked the button! (row 2)';
      const resultsTestId = 'dti-results';
      const buttonLocator = page
        .getByRole(parentRole)
        .filter({ has: page.getByText(siblingText) })
        .getByRole(elementRole);
      const resultsLocator = page.getByTestId(resultsTestId);
      // print the count of buttons on the page
      //   console.log('buttonLocator', await buttonLocator.count());
      // Act:
      await buttonLocator.click();
      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });
});
