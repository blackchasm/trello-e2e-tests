exports.TrelloBoardsPage = class TrelloBoardsPage {
    constructor(page) {
        this.page = page;

        this.createBoardButton = page.getByTestId('create-board-tile');
        this.createBoardTitleInput = page.getByTestId('create-board-title-input')
        this.createBoardSubmitButton = page.getByTestId('create-board-submit-button');
    }

    async goto() {
        await this.page.goto('https://trello.com/');
        await this.page.waitForURL(/https:\/\/trello\.com\/u\/user[0-9]+\/boards/);
    }

    async waitForBoardOpened() {
        await this.page.waitForURL(/https:\/\/trello\.com\/b\/.+\/.+/);
    }
}
