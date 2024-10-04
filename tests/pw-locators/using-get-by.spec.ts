import { expect, test } from '@playwright/test';

test.describe('Finding different elements with getBy methods', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-elements.html');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Find button element by getByRole methods', async ({ page }) => {
    const elementLocator = page.getByRole('button', { name: 'Click me' });

    await expect(elementLocator).toBeVisible();
  });

  test('Find button element by getByText and getByTestId methods', async ({
    page,
  }) => {
    const elementLocator = page.getByTestId('dti-button-element');
    const resultId = 'dti-results';
    const resultElementLocator = page.getByTestId(resultId);
    const expectedMessage = 'You clicked the button!';

    await expect(elementLocator).toBeVisible();

    await elementLocator.click();
    await expect(resultElementLocator).toContainText(expectedMessage);
  });
});
