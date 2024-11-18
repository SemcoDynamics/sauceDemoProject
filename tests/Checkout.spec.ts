import {test} from "../Fixtures/LoginAndNavigate";
import { expect } from "playwright/test";
import { Checkout_Page } from "../POM/Checkout_Page";
test.describe('Checkout tests', () => {
    test('Fill in form', async ({ loginAndNavigate, cartNavigate, page }) => {
        const checkoutPage = new Checkout_Page(page);
        await checkoutPage.formFirstName.fill('Jack');
        await checkoutPage.formLastName.fill('Crabs');
        await checkoutPage.formpostalCode.fill('2983')
        await checkoutPage.continueButton.click()
    })
    
})
