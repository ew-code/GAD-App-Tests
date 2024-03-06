import { STORAGE_STATE } from '../../playwright.config';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login with correct credentials', async ({ page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);
  await loginPage.goto();

  // Act
  await loginPage.login(testUser1);

  // Assert
  const title = await welcomePage.getTitle();
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
