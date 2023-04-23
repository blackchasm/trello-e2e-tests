import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://trello.com/login/');
  await page.locator('#user').fill('blackchasmfel@gmail.com');
  await page.locator('#login').click();
  await page.locator('#password').fill('Cherrytest1980');
  await page.locator('#login-submit').click();

  await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);

  await page.context().storageState({ path: authFile });
});