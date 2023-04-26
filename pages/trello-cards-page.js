const { expect } = require('@playwright/test');

exports.TrelloCardPage = class TrelloCardPage {
    constructor(page) {
        this.page = page;

        this.createCardButton = page.getByRole('link', { name: 'Добавить карточку'});
        this.createActionTextInput = page.getByTestId('card-back-new-comment-input-skeleton');
        this.saveActionTextButton = page.getByTestId('card-back-comment-save-button');
        this.archiveBanner = page.getByTestId('card-back-archive-banner');

    }

    async goto() {
        await this.page.goto('https://trello.com/b/xZcfNCnJ/for-otus');
    }

    async waitForCardOpened() {
        await this.page.goto('https://trello.com/');
        await this.page.waitForURL(/https:\/\/trello\.com\/c\/.+\/.+/);
    }

    async createCard(cardText) {
        this.createCardButton.first().click();
        await this.page.getByPlaceholder('Ввести заголовок для этой карточки').fill(cardText);
        await this.page.getByRole('button', { name: 'Добавить карточку' }).click();

        expect(await this.page.locator('.list-card-details').count()).toBeGreaterThan(0);
        await expect(this.page.locator('.list-card-details').nth(-2)).toContainText(cardText, { useInnerText: true });
    }
}
