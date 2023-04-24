const { test, expect } = require('@playwright/test');
import { TrelloBoardsPage } from '../pages/trello-boards-page.js';

test('Header title', async ({ page }) => {
    await page.goto('https://trello.com/home/');

    await expect(page).toHaveTitle(/Manage Your Team’s Projects From Anywhere | Trello/);
});

test('boards', async ({ page }) => {
    const boardsPage = new TrelloBoardsPage(page);
    boardsPage.goto();
    await expect(page).toHaveTitle('Доски | Trello')
});

test('Create board', async ({ page }) => {
    const boardsPage = new TrelloBoardsPage(page);
    
    boardsPage.goto();
    
    await expect(boardsPage.createBoardButton).toBeVisible();
    await boardsPage.createBoardButton.click();

    await expect(boardsPage.createBoardTitleInput).toBeVisible();
    await boardsPage.createBoardTitleInput.fill('Board for everyone');
    
    await expect(boardsPage.createBoardSubmitButton).toBeEnabled();
    await boardsPage.createBoardSubmitButton.click();

    await boardsPage.waitForBoardOpened();
});

test('Create private board', async ({ page }) => {
    const boardsPage = new TrelloBoardsPage(page);
    
    boardsPage.goto();

    await expect(boardsPage.createBoardButton).toBeVisible();
    await boardsPage.createBoardButton.click();
    await expect(boardsPage.createBoardTitleInput).toBeVisible();
    await boardsPage.createBoardTitleInput.fill('Board for me');
    await page.getByText('Рабочее пространство').click();
    await page.getByText('Приватная').click();
    await expect(boardsPage.createBoardSubmitButton).toBeEnabled();
    await boardsPage.createBoardSubmitButton.click();

    await boardsPage.waitForBoardOpened();
});

test('Create public board', async ({ page }) => {
    const boardsPage = new TrelloBoardsPage(page);
    
    boardsPage.goto();

    await expect(boardsPage.createBoardButton).toBeVisible();
    await boardsPage.createBoardButton.click();
    await expect(boardsPage.createBoardTitleInput).toBeVisible();
    await boardsPage.createBoardTitleInput.fill('Board for all');
    await page.getByText('Рабочее пространство').click();
    await page.getByText('Публичная').click();
    await page.getByText('Да, сделать доску публичной').click();
    await expect(boardsPage.createBoardSubmitButton).toBeEnabled();
    await boardsPage.createBoardSubmitButton.click();

    await boardsPage.waitForBoardOpened();
});

