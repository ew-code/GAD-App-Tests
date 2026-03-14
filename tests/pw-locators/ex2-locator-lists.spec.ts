import { expect, test } from '@playwright/test';

test.describe('Locator lists', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-multiple-elements-no-ids.html');
  });

  test('All checkboxes on page', async ({ page }) => {
    // Arrange:
    const expectedCheckboxesCount = 5;
    const checkboxesLocator = page.getByRole('checkbox');

    // Assert:
    await expect(checkboxesLocator).toHaveCount(expectedCheckboxesCount);
  });

  test('action on multiple checkboxes', async ({ page }) => {
    // Arrange:
    const elementRole = 'checkbox';
    const resultsTestId = 'dti-results';

    const checkboxesLocator = page.getByRole(elementRole);

    const numberOfCheckboxes = await checkboxesLocator.count();
    for (let i = 0; i < numberOfCheckboxes; i++) {
      await checkboxesLocator.nth(i).click();
      //   console.log(await resultsLocator.textContent());
    }

    const allCheckboxesLocators = await checkboxesLocator.all();
    for (const checkboxLocator of allCheckboxesLocators) {
      await checkboxLocator.check();
      //   console.log(await resultsLocator.textContent());
    }

    // Assert:
    await expect(checkboxesLocator).toHaveCount(5);
    const resultsLocator = page.getByTestId(resultsTestId);
    await expect(resultsLocator).toHaveText(
      `Checkbox is checked! (Opt ${numberOfCheckboxes}!)`,
    );
  });
});
