import {expect} from "@playwright/test";

const {contactsPage} = require("../pageObject/contactsPage")

let contactsP

export const fillContactFields = async (page, firstName, lastName, middleName, email, emailSecond, phoneNum, text, company, jobTitle, jobRole, nickName, comments) => {

    contactsP  = new contactsPage(page)

    await contactsP.firstNameFill(firstName)
    await contactsP.lastNameFill(lastName)
    await contactsP.middleNameFill(middleName)
    await contactsP.emailFill(email)
    await contactsP.emailSecondFill(emailSecond)
    await contactsP.phoneNumFill(phoneNum)
    await contactsP.selectJobRole(text)
    await contactsP.companyFill(company)
    await contactsP.jobTitleFill(jobTitle)
    await contactsP.jobRoleFill(jobRole)
    await contactsP.nickNameFill(nickName)
    await contactsP.commentsFill(comments)

}

export const checkContactField = async (page, firstName, lastName, middleName, email, emailSecond, phoneNum, text, company, jobTitle, jobRole, nickName, comments) => {

    await expect.soft(page.getByText(`${firstName}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${lastName}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${middleName}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${email}`)).toBeVisible()
    await expect.soft(page.getByText(`${emailSecond}`)).toBeVisible()
    await expect.soft(page.getByText(`${phoneNum}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${text}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${company}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${jobTitle}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${jobRole}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${jobTitle}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${nickName}`, { exact: true })).toBeVisible()
    await expect.soft(page.getByText(`${comments}`, { exact: true })).toBeVisible()

}

export const contactUrl = {
    getUrl: async function (page) {
        const newUrl = page.url()
        const number = newUrl.split('/').pop()
        return process.env.URL + `/profile/contacts/${number}`
    }
}

export const clearFieldsOfContact = async (page, jobRoleSelector) => {

    const inputFields = await page.$$('input')
    for (const input of inputFields) {
        const inputType = await input.getAttribute('type')
        if (inputType !== 'checkbox') {
            await input.fill('')
        }
    }

    contactsP  = new contactsPage(page)
    await contactsP.selectJobRole(`${jobRoleSelector}`)
    await contactsP.commentsFill('')
}

export const deleteContact = async (page) => {

    contactsP  = new contactsPage(page)

    await contactsP.deleteBtnClick()
    await contactsP.deleteBtnModal()


}
