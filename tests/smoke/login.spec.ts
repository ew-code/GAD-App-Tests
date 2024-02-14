import { LoginUser } from '../../src/models/user.models';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUser = {
      email: testUser1.userEmail,
      password: testUser1.userPassword,
    };
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(loginUserData);
    const welcomePage = new WelcomePage(page);

    // Assert
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const email = testUser1.userEmail;
    const password = 'incorrectPassword';
    await loginPage.goto();

    // Act
    await loginPage.login(email, password);

    // Assert
    const title = await loginPage.title();
    await expect
      .soft(loginPage.loginError)
      .toContainText('Invalid username or password');
    expect.soft(title).toContain('Login');
  });
});
