import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data @GAD-R03-01', async ({ page }) => {
    // Arrange
    const firstName = 'Mobs';
    const lastName = 'Mobs';
    const email = `mobs${new Date().getTime()}@mobs.test.pl`;
    const password = '1234';
    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.register(firstName, lastName, email, password);

    // Assert
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });
});
