const {expect} = require("@playwright/test");

class authPage {

    constructor(page) {
        this.page = page
        this.signInBtn = page.getByRole('button', { name: ' Sign in' })
        this.email = page.locator('input[autocomplete="username"]')
        this.password = page.locator('input[autocomplete="current-password"]')

    }

    async fillEmail(email) {
        await this.email.type(email, {delay: 300})
    }

    async fillPassword(pass) {
        await this.password.type(pass, {delay: 300})
    }

    async authBtnClick() {
        await expect.soft(this.signInBtn).toBeVisible()
        await this.signInBtn.click()
    }

    async waitForPageUrlLoaded(url) {
        await this.page.waitForURL(`${process.env.URL}${url}`)

    }

    async acceptCoockies(){
        await this.page.getByText('Allow all').click()
    }

    async incorrectEmailOrPassTextVisible() {
        await expect.soft(this.page.getByText('Incorrect email or password')).toBeVisible()

    }

    async exclamationIsVisible() {
        await expect.soft(this.page.locator(".v1xpeu6y")).toBeVisible()
    }

    async navigateToProfile(text){
        await this.page.getByText(`${text}`).click()
    }

    async logout(){
        await this.page.getByText('Logout').click()
        await this.page.waitForLoadState('networkidle')
    }


}

module.exports = {authPage}