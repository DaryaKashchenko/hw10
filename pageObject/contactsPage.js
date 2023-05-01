const {expect} = require("@playwright/test");

class contactsPage {

    constructor(page) {
        this.page = page
        this.fName = page.locator('input[name="fname"]')
        this.lName = page.locator('input[name="lname"]')
        this.middleName = page.locator('input[name="tokens.middlename"]')
        this.email = page.locator('input[name="email"]')
        this.emailSecond = page.locator('input[name="email2"]')
        this.phoneNum = page.locator('input[name="phone_number"]')
        this.company = page.locator('input[name="tokens.company"]')
        this.jobTitle = page.locator('input[name="tokens.title"]')
        this.jobRole = page.locator('input[name="tokens.role"]')
        this.nickName = page.locator('input[name="nickname"]')
        this.comments = page.locator('textarea[name="tokens.note"]')
        this.createBtn = page.getByRole('button', { name: 'Create' })
        this.editBtn = page.getByRole('button', { name: 'Edit' })
        this.saveBtn = page.getByRole('button', { name: 'Save' })
        this.deleteBtn = page.getByRole('button', { name: 'Delete' })



    }

    async createNewContactBtn() {
        await this.page.locator('a[href="/profile/contacts/new"]').click()
    }

    async firstNameFill(firstName) {
        await this.fName.type(firstName)
    }

    async lastNameFill(lastName) {
        await this.lName.type(lastName)
    }

    async middleNameFill(middleName) {
        await this.middleName.type(middleName)
    }

    async emailFill(email) {
        await this.email.type(email)
    }

    async emailSecondFill(emailSecond) {
        await this.emailSecond.type(emailSecond)
    }

    async phoneNumFill(phoneNum) {
        await this.phoneNum.type(phoneNum)
    }

    async selectJobRole(text) {
        await this.page.locator(`text=${text}`).click()
    }

    async companyFill(company) {
        await this.company.type(company)
    }

    async jobTitleFill(jobTitle) {
        await this.jobTitle.type(jobTitle)
    }

    async jobRoleFill(jobRole) {
        await this.jobRole.type(jobRole)
    }

    async nickNameFill(nickName) {
        await this.nickName.type(nickName )
    }

    async commentsFill(comments) {
        await this.comments.fill(comments)
    }

    async createBtnClick() {
        await this.createBtn.click()
    }

    async editBtnClick() {
        await this.editBtn.click()
    }

    async saveBtnClick() {
        await this.saveBtn.click()
    }

    async deleteBtnClick() {
        await this.page.locator('.ir812m3.fa.fa-trash').click()
    }

    async searchContact(text) {
        await this.page.locator('.i1ol8bi9').type(text)

    }

    async deleteBtnModal() {
        await this.deleteBtn.click()
    }

    async checkSuccessAlert(action) {
        await expect.soft(this.page.getByText('Success', { exact: true })).toBeVisible()
        await expect.soft(this.page.getByText(`${action} successfully`)).toBeVisible()

    }

}

module.exports = {contactsPage}

