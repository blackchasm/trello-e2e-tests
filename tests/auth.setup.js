import { test as setup } from '@playwright/test';
import { TrelloAuthPage } from '../pages/trello-auth-page.js';

setup('authenticate', async ({ page }) => {
  const authPage = new TrelloAuthPage(page);

  await authPage.goto();
  await authPage.userInput.fill('blackchasmfel@gmail.com');
  await authPage.loginButton.click();
  await authPage.passwordInput.fill('Cherrytest1980');
  await authPage.submitButton.click();

  await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);

  await authPage.saveState();
});
