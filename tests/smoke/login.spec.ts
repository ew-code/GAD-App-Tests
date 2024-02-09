import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const email = testUser1.userEmail;
    const password = testUser1.userPassword;
    await loginPage.goto();

    // Act
    await loginPage.login(email, password);
    const welcomePage = new WelcomePage(page);

    // Assert
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });
});
