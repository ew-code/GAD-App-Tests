import { RegisterUser } from '../../src/models/user.models';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
// import {  faker} from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const registerUserData: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      email: '',
      password: faker.internet.password(),
    };

    registerUserData.email = faker.internet.email({
      firstName: registerUserData.firstName,
      lastName: registerUserData.lastName,
    });

    const registerPage = new RegisterPage(page);
    const expectedAlertPopUpText = 'User created';

    // Act
    await registerPage.goto();

    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    // Assert
    await loginPage.login({
      userEmail: registerUserData.email,
      userPassword: registerUserData.password,
    });
    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });

  test('not register with incorrect data - not valid email @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const registerUserData: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      email: '#$%',
      password: faker.internet.password(),
    };
    const expectedErrorText = 'Please provide a valid email address';

    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });

  test('not register with incorrect data - email not provided @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const expectedErrorText = 'This field is required';
    const registerPage = new RegisterPage(page);

    // Act
    await registerPage.goto();
    await registerPage.firstNameInput.fill(
      faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    );
    await registerPage.lastNameInput.fill(
      faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    );
    await registerPage.passwordInput.fill(faker.internet.password());
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
