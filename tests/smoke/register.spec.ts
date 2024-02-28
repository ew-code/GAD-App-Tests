import prepareRandomUser from '../../src/factories/user.factory';
import { RegisterUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
// import {  faker} from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    await registerPage.goto();
  });

  test('register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const expectedAlertPopUpText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect.soft(titleLogin).toContain(expectedLoginTitle);
    await loginPage.login({
      userEmail: registerUserData.email,
      userPassword: registerUserData.password,
    });
    const titleWelcome = await welcomePage.getTitle();
    expect(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('not register with incorrect data - not valid email @GAD-R03-04', async () => {
    // Arrange
    const expectedErrorText = 'Please provide a valid email address';
    registerUserData.email = '#$%';

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('not register with incorrect data - email not provided @GAD-R03-04', async () => {
    // Arrange
    const expectedErrorText = 'This field is required';

    // Act
    await registerPage.firstNameInput.fill(registerUserData.firstName);
    await registerPage.lastNameInput.fill(registerUserData.lastName);
    await registerPage.passwordInput.fill(registerUserData.password);
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
