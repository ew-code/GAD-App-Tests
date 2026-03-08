import { expect, test } from '@playwright/test';

test.describe('Finding different elements using raw locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-elements.html');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Find label element by ID (CSS)', async ({ page }) => {
    const elementSelector = '#id-label-element';
    const elementLocator = page.locator(elementSelector);
    const expectedMessage = 'Some text for label';

    await expect(elementLocator).toBeVisible();
    await expect(elementLocator).toHaveText(expectedMessage);
  });

  test('Find label element by ID (XPath)', async ({ page }) => {
    const elementSelector = "//*[@id='id-label-element']";
    const elementLocator = page.locator(elementSelector);
    const expectedMessage = 'Some text for label';

    await expect(elementLocator).toBeVisible();
    await expect(elementLocator).toHaveText(expectedMessage);
  });

  test('Find checkbox element by ID', async ({ page }) => {
    const elementSelector = '#id-checkbox';
    const elementLocator = page.locator(elementSelector);
    const expectedValue = 'checkbox';

    await expect(elementLocator).toBeInViewport();
    await expect(elementLocator).toHaveValue(expectedValue);
  });

  test('Find checkbox element by class', async ({ page }) => {
    const elementSelector = '.my-checkbox';
    const elementLocator = page.locator(elementSelector);
    const expectedValue = 'checkbox';

    await expect(elementLocator).toBeInViewport();
    await expect(elementLocator).toHaveValue(expectedValue);
  });

  test('Find checkbox element by role', async ({ page }) => {
    const elementSelector = 'checkbox';
    const elementLocator = page.getByRole(elementSelector);
    const expectedValue = 'checkbox';

    await expect(elementLocator).toBeInViewport();
    await expect(elementLocator).toHaveValue(expectedValue);
  });

  test('Find checkbox element by data-testid', async ({ page }) => {
    const elementSelector = 'dti-checkbox';
    const elementLocator = page.getByTestId(elementSelector);
    const expectedValue = 'checkbox';

    await expect(elementLocator).toBeInViewport();
    await expect(elementLocator).toHaveValue(expectedValue);
  });

  test('Find checkbox element by attribute name', async ({ page }) => {
    const elementSelector = "[ckbx='val1']";
    const elementLocator = page.locator(elementSelector);
    const expectedValue = 'checkbox';

    await expect(elementLocator).toBeInViewport();
    await expect(elementLocator).toHaveValue(expectedValue);
  });
});
