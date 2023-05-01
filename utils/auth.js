
const {authPage} = require('../pageObject/authPage')
let authP

export const login = async (page, email, pass) => {

    authP = new authPage(page)


    await page.goto(process.env.URL)
    await authP.acceptCoockies()
    await authP.fillEmail(email)
    await authP.fillPassword(pass)
    await authP.authBtnClick()

}

export const logout = async (page, email) => {

    authP = new authPage(page)

    await authP.navigateToProfile(email)
    await authP.logout()


}

export const getEmail = {

    emailUpperCase: function (validEmail) {
    const email = `${validEmail}`
    return email.charAt(0).toUpperCase() + email.slice(1)

}

}