
class createServerPage {

    constructor(page) {
        this.page = page
        this.createServBtn = page.getByRole('button', { name: 'Create server' })
        this.createCloudServBtn = page.getByRole('button', { name: 'Create Cloud Server' })



    }

    async createServerBtn() {
        await this.createServBtn.click()
    }

    async createCloudServerBtn() {
        await this.createCloudServBtn.click()
    }

    async selectParameter(text) {
        await this.page.locator('label').getByText(`${text}`).click()
    }

    async selectImage(text) {
        await this.page.getByText(`${text}`).click()
    }

    async fillServerName (name) {
        await this.page.locator('input[name="name"]').type(name)
    }



}

module.exports = {createServerPage}

