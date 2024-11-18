import {test} from "../Fixtures/LoginAndNavigate";
import { expect } from "playwright/test";
import { Checkout_Page } from "../POM/Checkout_Page";
import { YourCart_Page } from "../POM/YourCart_Page";
test.describe('Checkout tests', () => {
    test('Fill in form', async ({ loginAndNavigate, cartNavigate, page }) => {
        const checkoutPage = new Checkout_Page(page);
        await checkoutPage.formFirstName.fill('Jack');
        await checkoutPage.formLastName.fill('Crabs');
        await checkoutPage.formpostalCode.fill('2983')
        await checkoutPage.continueButton.click()
    })
    test('fill form and cancel', async ({ loginAndNavigate, cartNavigate, page }) => {
        const checkoutPage = new Checkout_Page(page);
        const cartPage = new YourCart_Page(page)
        await checkoutPage.formFirstName.fill('Jack');
        await checkoutPage.formLastName.fill('Crabs');
        await checkoutPage.formpostalCode.fill('2983')
        await checkoutPage.cancelButton.click()
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(cartPage.inventoryItem).toContainText('$15.99')
    });
    
})
