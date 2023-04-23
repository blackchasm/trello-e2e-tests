const { test, expect } = require('@playwright/test');

test('Header title', async ({ page }) => {
    await page.goto('https://trello.com/home/');

    await expect(page).toHaveTitle(/Manage Your Team’s Projects From Anywhere | Trello/);
});

test('boards', async ({ page }) => {
    await page.goto('https://trello.com/');
    await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);
    await expect(page).toHaveTitle('Доски | Trello')
});

test('Create board', async ({ page }) => {
    await page.goto('https://trello.com/');
    await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);
    
    let createBtn = page.getByTestId('create-board-tile');
    await expect(createBtn).toBeVisible();
    await createBtn.click();

    const boardName = 'Board for everyone';
    await expect(page.getByTestId('create-board-title-input')).toBeVisible();
    await page.getByTestId('create-board-title-input').fill(boardName);
    await expect(page.getByTestId('create-board-submit-button')).toBeEnabled();
    await page.getByTestId('create-board-submit-button').click();

    await page.waitForURL(/https:\/\/trello\.com\/b\/.+\/.+/);
});

test('Create private board', async ({ page }) => {
    await page.goto('https://trello.com/');
    await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);

    let createBtn = page.getByTestId('create-board-tile');
    await expect(createBtn).toBeVisible();
    await createBtn.click();
    const boardName = 'Board for me';
    await expect(page.getByTestId('create-board-title-input')).toBeVisible();
    await page.getByTestId('create-board-title-input').fill(boardName);
    await page.getByText('Рабочее пространство').click();
    await page.getByText('Приватная').click();
    await expect(page.getByTestId('create-board-submit-button')).toBeEnabled();
    await page.getByTestId('create-board-submit-button').click();

    await page.waitForURL(/https:\/\/trello\.com\/b\/.+\/.+/);
});

test('Create public board', async ({ page }) => {
    await page.goto('https://trello.com/');
    await page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);

    let createBtn = page.getByTestId('create-board-tile');
    await expect(createBtn).toBeVisible();
    await createBtn.click();
    const boardName = 'Board for all';
    await expect(page.getByTestId('create-board-title-input')).toBeVisible();
    await page.getByTestId('create-board-title-input').fill(boardName);
    await page.getByText('Рабочее пространство').click();
    await page.getByText('Публичная').click();
    await page.getByText('Да, сделать доску публичной').click();
    await expect(page.getByTestId('create-board-submit-button')).toBeEnabled();
    await page.getByTestId('create-board-submit-button').click();

    await page.waitForURL(/https:\/\/trello\.com\/b\/.+\/.+/);
});

