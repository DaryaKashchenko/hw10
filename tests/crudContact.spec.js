const { test, expect } = require('@playwright/test')
const {login} = require("../utils/auth");
const {authPage} = require("../pageObject/authPage")
const {sideBarPage} = require("../pageObject/sideBarPage")
const {contactsPage} = require("../pageObject/contactsPage")
const {faker} = require('@faker-js/faker')
const {contactUrl, checkContactField, clearFieldsOfContact, fillContactFields, deleteContact} = require("../utils/contacts");
let authP
let sideBarP
let contactsP
const profileContactsLink = '/profile/contacts'

test.describe('crud contacts', async () => {

  test.beforeEach( async ({page}) => {

    authP = new authPage(page)
    sideBarP = new sideBarPage(page)

    await login(page, process.env.USERNAME, process.env.PASSWORD)
    await sideBarP.openProfileMenu()
    await sideBarP.openContactsMenu()
    await expect(page).toHaveURL(`${process.env.URL}${profileContactsLink}`)

  })

  test (' crud contacts', async ({page}) => {

        contactsP = new contactsPage(page)
        const user = {
          "fName": faker.name.firstName(),
          "lName": faker.name.lastName(),
          "midName": faker.name.middleName(),
          "email": faker.internet.email(),
          "email2": faker.internet.email(),
          "mobPhone": faker.phone.number('+1 (921) ###-##-##'),
          "jobRoleSelect": "Technical",
          "company": faker.company.bs(),
          "jobTitle": faker.name.jobTitle(),
          "jobRole": faker.name.jobType(),
          "nick": faker.helpers.unique(faker.name.firstName),
          "comments": faker.random.words(5),

        }
        const user2 = {
            ...user,
            "fName": faker.name.firstName(),
            "lName": faker.name.lastName(),
            "email": faker.internet.email(),
            "email2": faker.internet.email(),
            "mobPhone": faker.phone.number('+1 (921) ###-##-##'),
            "jobRoleSelect": "Emergency",
            "company": faker.company.bs(),
            "jobTitle": faker.name.jobTitle(),
            "jobRole": faker.name.jobType(),
            "nick": faker.helpers.unique(faker.name.firstName),
            "comments": faker.random.words(5)
          }

        await contactsP.createNewContactBtn()
        await expect(page).toHaveURL(`${process.env.URL}${profileContactsLink}/new`)

        await fillContactFields(page, user.fName, user.lName, user.midName, user.email, user.email2, user.mobPhone, user.jobRoleSelect,  user.company, user.jobTitle, user.jobRole, user.nick, user.comments)
        await contactsP.createBtnClick()
        await contactsP.checkSuccessAlert('Created')

          await page.pause()
        await checkContactField(page, user.fName, user.lName, user.midName, user.email, user.email2, user.mobPhone, user.jobRoleSelect,  user.company, user.jobTitle, user.jobRole, user.nick, user.comments)
        const url = await contactUrl.getUrl(page)
        await expect.soft(page).toHaveURL(`${url}`)

        await contactsP.editBtnClick()
        await expect.soft(page).toHaveURL(`${url}/edit`)
        await clearFieldsOfContact(page, user.jobRoleSelect)

        await fillContactFields(page, user2.fName, user2.lName, user2.midName, user2.email, user2.email2, user2.mobPhone, user2.jobRoleSelect,  user2.company, user2.jobTitle, user2.jobRole, user2.nick, user2.comments)
        await contactsP.saveBtnClick()
        await contactsP.checkSuccessAlert('Updated')
        await checkContactField(page, user2.fName, user2.lName, user2.midName, user2.email, user2.email2, user2.mobPhone, user2.jobRoleSelect,  user2.company, user2.jobTitle, user2.jobRole, user2.nick, user2.comments)

        await page.goto(`${process.env.URL}${profileContactsLink}`)
        await contactsP.searchContact(`${user2.fName} ${user2.lName}`)

        await deleteContact(page)
        await contactsP.checkSuccessAlert('Deleted')
        await expect.soft(page.getByText('No contacts found')).toBeVisible()



      })

})



