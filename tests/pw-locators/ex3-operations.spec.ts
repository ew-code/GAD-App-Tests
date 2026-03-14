import { expect, test } from '@playwright/test';

test.describe('Locator filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('practice/simple-reservation-v1.html');
  });

  test.describe('Reservation', () => {
    test('simple reservation with one feature', async ({ page }) => {
      // Arrange:
      const checkboxRole = 'checkbox';
      const checkboxText = 'Food 🥗 50$';
      const parentRole = 'row';
      const parentText = '23.10.2024 100$ Reserve';
      const buttonRole = 'button';
      const buttonText = 'Checkout';

      const resultsTestId = 'dti-results';
      const expectedMessage =
        'Reservation for 23.10.2024 with features: Food for total price: 150$';

      const checkboxLocator = page
        .getByRole(parentRole, { name: checkboxText })
        .getByRole(checkboxRole);

      const reserveButtonLocator = page
        .getByRole(parentRole, { name: parentText })
        .getByRole(buttonRole);

      const checkoutButtonLocator = page.getByRole(buttonRole, {
        name: buttonText,
      });
      const resultsLocator = page.getByTestId(resultsTestId);

      //   // Act:
      await checkboxLocator.check();
      await reserveButtonLocator.click();
      await checkoutButtonLocator.click();

      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });
});
