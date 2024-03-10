import { LoginUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);
    // const welcomePage = new WelcomePage(page);
    await loginPage.goto();

    // Act
    const welcomePage = await loginPage.login(testUser1);

    // Assert
    const title = await welcomePage.getTitle();
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const expectedLoginTitle = 'Login';
    const loginPage = new LoginPage(page);

    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };
    await loginPage.goto();

    // Act
    await loginPage.login(loginUserData);

    // Assert
    const title = await loginPage.getTitle();
    await expect
      .soft(loginPage.loginError)
      .toContainText('Invalid username or password');
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
