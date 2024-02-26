import { LoginUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(testUser1);
    const welcomePage = new WelcomePage(page);

    // Assert
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };
    await loginPage.goto();

    // Act
    await loginPage.login(loginUserData);

    // Assert
    const title = await loginPage.title();
    await expect
      .soft(loginPage.loginError)
      .toContainText('Invalid username or password');
    expect.soft(title).toContain('Login');
  });
});
