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
    //  const firstName = "O'K'on".replace(/[^A-Za-z]/g, '');
    // const email = `mobs${new Date().getTime()}@mobs.test.pl`;
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
});
