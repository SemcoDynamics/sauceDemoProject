import {test} from "../Fixtures/LoginAndNavigate";
import { expect } from "playwright/test";
import { Checkout_Page } from "../POM/Checkout_Page";
import { YourCart_Page } from "../POM/YourCart_Page";
import data from "../HelperFiles/data.json"
test.describe('Checkout tests', () => {
    test('Fill in form', async ({ loginAndNavigate, cartNavigate, page }) => {
        const checkoutPage = new Checkout_Page(page);
        const cartPage = new YourCart_Page(page)
        await checkoutPage.checkoutForm(data.formDetails.firstnames[1], data.formDetails.lastnames[2], data.formDetails.postalCode[3])
        await checkoutPage.continueButton.click()
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(cartPage.inventoryItem).toContainText('$15.99')
    })
    test('fill form and cancel', async ({ loginAndNavigate, cartNavigate, page }) => {
        const checkoutPage = new Checkout_Page(page);
        const cartPage = new YourCart_Page(page)
        await checkoutPage.checkoutForm(data.formDetails.firstnames[2], data.formDetails.lastnames[3], data.formDetails.postalCode[4])
        await checkoutPage.cancelButton.click()
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(cartPage.inventoryItem).toContainText('$15.99')
    });
    
})
