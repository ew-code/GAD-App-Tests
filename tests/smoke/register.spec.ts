import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    // const email = `mobs${new Date().getTime()}@mobs.test.pl`;
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    });
    const password = faker.internet.password();
    const registerPage = new RegisterPage(page);
    const expectedAlertPopUpText = 'User created';
    // Act
    await registerPage.goto();
    await registerPage.register(firstName, lastName, email, password);

    // Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    // Assert
    await loginPage.login(email, password);
    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });
});
