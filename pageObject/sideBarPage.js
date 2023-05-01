
class sideBarPage {

    constructor(page) {
        this.page = page
    }

    async openProfileMenu() {
        await this.page.locator('i[title="Profile"]').click()
    }

    async openContactsMenu() {
        await this.page.locator('a[href="/profile/contacts"]').click()
    }

    async openCloudServerMenu() {
        await this.page.locator('i[title="Cloud Servers"]').click()
    }

    async openCreateServerPage() {
        await this.page.locator('a[href="/cloud-computing?page=1"]').click()
    }
}

module.exports = {sideBarPage}

