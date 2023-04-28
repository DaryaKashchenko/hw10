const { test, expect } = require('@playwright/test')
const {login, getEmail, logout} = require("../utils/auth");
const {authPage} = require("../pageObject/authPage")
const {faker} = require('@faker-js/faker')
let authP

test.describe('authorization tests', async () => {

  test (' valid pass - login - logout', async ({ page }) => {

    authP = new authPage(page)
    await login(page, process.env.USERNAME, process.env.PASSWORD)
    await authP.waitForPageUrlLoaded('/dashboard')
    await expect(page).toHaveURL(`${process.env.URL}/dashboard`)

    await logout(page, process.env.USERNAME)
    await expect(page).toHaveURL(`${process.env.URL}/login`)

  })

  test ( 'email in upper case',async ({page}) => {

    authP = new authPage(page)
    await login(page, getEmail.emailUpperCase(process.env.USERNAME), process.env.PASSWORD)
    await authP.waitForPageUrlLoaded('/dashboard')
    await expect(page).toHaveURL(`${process.env.URL}/dashboard`)

  })

  test ('wrong email - valid password', async ({ page }) => {

    authP = new authPage(page)
    await login(page, faker.internet.email(), process.env.PASSWORD)
    await authP.incorrectEmailOrPassTextVisible()

  })

  test ('valid email - wrong password', async ({ page }) => {

    authP = new authPage(page)
    await login(page, process.env.USERNAME, faker.datatype.string())
    await authP.incorrectEmailOrPassTextVisible()

  })

  test ('wrong password - wrong password', async ({ page }) => {

    authP = new authPage(page)
    await login(page, faker.internet.email(), faker.datatype.string())
    await authP.incorrectEmailOrPassTextVisible()

  })

  test ('email validation', async ({ page }) => {

    authP = new authPage(page)
    await login(page, faker.datatype.string(), process.env.PASSWORD)
    await authP.exclamationIsVisible()

  })

  test ('empty login and password', async ({ page }) => {

    authP = new authPage(page)
    await login(page, '', '')
    await expect(page).toHaveURL(`${process.env.URL}/login`)


  })

})



