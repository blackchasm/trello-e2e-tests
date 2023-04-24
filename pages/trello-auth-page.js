const authFile = 'playwright/.auth/user.json';

exports.TrelloAuthPage = class TrelloAuthPage {
    constructor(page) {
        this.page = page;
        this.userInput = page.locator('#user');
        this.loginButton = page.locator('#login');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#login-submit');
    }

    async goto() {
        await this.page.goto('https://trello.com/login/');
    }

    async saveState() {
        await this.page.context().storageState({ path: authFile });
    }
}
