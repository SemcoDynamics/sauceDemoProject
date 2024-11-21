import {test} from "../Fixtures/LoginAndNavigate";
import { expect } from "playwright/test";
import { Checkout_Page } from "../POM/Checkout_Page";
import { YourCart_Page } from "../POM/YourCart_Page";
import data from "../HelperFiles/data.json"
test.describe('Checkout tests', () => {
    test('Fill in form and checkout', async ({ loginAndNavigate, cartNavigate, page }) => {
        await loginAndNavigate;
        await cartNavigate;
        const checkoutPage = new Checkout_Page(page);
        const cartPage = new YourCart_Page(page);
        await checkoutPage.checkoutForm(data.formDetails.firstnames[1], data.formDetails.lastnames[2], data.formDetails.postalCode[3]);
        await checkoutPage.continueButton.click();
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(cartPage.inventoryItem).toContainText('$15.99')
        await checkoutPage.finishButton.click()
    })
    test('fill form and cancel', async ({ loginAndNavigate, cartNavigate, page }) => {
        await loginAndNavigate;
        await cartNavigate;
        const checkoutPage = new Checkout_Page(page);
        const cartPage = new YourCart_Page(page)
        await checkoutPage.checkoutForm(data.formDetails.firstnames[2], data.formDetails.lastnames[3], data.formDetails.postalCode[4])
        await checkoutPage.cancelButton.click()
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(cartPage.inventoryItem).toContainText('$15.99')
    });
    
})
test.describe('Checkout complete', () => {
    test('Complete the checkout', async ({loginAndNavigate, cartNavigate, checkoutNavigate, page }) => {
        await loginAndNavigate;
        await cartNavigate;
        await checkoutNavigate;
        const checkoutPage = new Checkout_Page(page);
        await expect(checkoutPage.checkoutCompleteContainer).toContainText(data.CompleteHeader)
        await expect(checkoutPage.checkoutCompleteContainer).toContainText(data.CompleteText)
        await checkoutPage.backHomeButton.click()
    })
    
})

