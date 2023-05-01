const { test, expect } = require('@playwright/test')
const {login} = require("../utils/auth");
const {authPage} = require("../pageObject/authPage")
const {sideBarPage} = require("../pageObject/sideBarPage")
const {createServerPage} = require("../pageObject/createServerPage")
const {selectServerParameters} = require("../utils/servers");
let authP
let sideBarP
let createServerP
const cloudLink = '/cloud-computing?page=1'

test.describe('create server', async () => {

  test.beforeEach( async ({page}) => {

    authP = new authPage(page)
    sideBarP = new sideBarPage(page)

    await login(page, process.env.USERNAME, process.env.PASSWORD)
    await sideBarP.openCloudServerMenu()
    await sideBarP.openCreateServerPage()
    await expect(page).toHaveURL(`${process.env.URL}${cloudLink}`)

  })

  test (' create server', async ({page}) => {

    createServerP = new createServerPage(page)

    const server = {
      "location": "Amsterdam - az2",
      "locationLink": "/cloud-computing/editor?location_id=4",
      "image": "Almalinux 8 (64 bit)",
      "configuration": "SSD.301 vCPU, 1024 MB RAM, 30 GB SSD2048 GB free traffic, €0.01 / / GB overuse€4",
      "ssh": "SSH key",
      "password": "Password",
      "withoutBackup": "No, I don't need automatic backups",
      "name": "my test server"

    }

    await page.pause()
    await createServerP.createServerBtn()
    await selectServerParameters(page, server.location, server.locationLink, server.image, server.configuration, server.ssh, server.password, server.name )
    await createServerP.createCloudServerBtn()
    await expect(page).toHaveURL(`${process.env.URL}/payment/methods`)



  })

})



