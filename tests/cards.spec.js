const { test, expect } = require('@playwright/test');
import { TrelloCardPage } from '../pages/trello-cards-page.js';
import { TrelloBoardsPage } from '../pages/trello-boards-page.js';


test('Create card', async ({ page }) => {
    const cardPage = new TrelloCardPage(page);
    
    await cardPage.goto();
    await cardPage.createCard(`Card for testing ${Date.now()}`);
});

test('Add description', async ({ page }) => {
    const cardPage = new TrelloCardPage(page);

    await cardPage.goto();

    const cardName = `Add description test ${Date.now()}`;
    await cardPage.createCard(cardName);

    await page.getByRole('link', { name: cardName }).click();
    await page.getByTestId('click-wrapper').locator('div[contenteditable=true]').fill('Test content');
    await page.getByRole('button', { name: 'Сохранить'}).click();
    await page.locator('.dialog-close-button').click();

    await expect(page.getByRole('link', { name: cardName }).locator('.icon-description')).toBeVisible();
});


test('Subscribe', async ({ page }) => {
    const cardPage = new TrelloCardPage(page);
    
    await cardPage.goto();

    const cardName = `Add subscribe test ${Date.now()}`;
    await cardPage.createCard(cardName);
    
    await page.getByRole('link', { name: cardName }).click();
    await page.locator('.subscribe-detail-button').click();
    await page.locator('.dialog-close-button').click();

    await expect(page.getByRole('link', { name: cardName }).locator('.icon-subscribe')).toBeVisible();
});

test('Archive card', async ({ page }) => {
    const cardPage = new TrelloCardPage(page);
    
    await cardPage.goto();

    const cardName = `Archive card ${Date.now()}`;
    await cardPage.createCard(cardName);
    
    await page.getByRole('link', { name: cardName }).click();
    await page.locator('.js-archive-card').click();
    await expect(cardPage.archiveBanner).toBeVisible();
});

test('Archive card and return in work', async ({ page }) => {
    const cardPage = new TrelloCardPage(page);
    
    await cardPage.goto();

    const cardName = `Archive card for return ${Date.now()}`;
    await cardPage.createCard(cardName);
    
    await page.getByRole('link', { name: cardName }).click();
    await page.locator('.js-archive-card').click();
    await page.locator('.js-unarchive-card').click();

    await expect(cardPage.archiveBanner).not.toBeVisible();
});

