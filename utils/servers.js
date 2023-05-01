import {createServerPage} from "../pageObject/createServerPage"
import {expect} from "@playwright/test";
let createServerP

export const selectServerParameters = async (page, location, link, image, configuration, ssh, password, name) => {
    createServerP = new createServerPage(page)

    await createServerP.selectParameter(location)
    await expect(page).toHaveURL(`${process.env.URL}${link}`)
    await createServerP.selectImage(image)
    await createServerP.selectParameter(configuration)
    await createServerP.selectParameter(ssh)
    await createServerP.selectParameter(password)
    await createServerP.fillServerName(name)
}