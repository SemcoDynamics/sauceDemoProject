import {test} from "../Fixtures/LoginAndNavigate";
import { expect } from "playwright/test";
import { Checkout_Page } from "../POM/Checkout_Page";
import data from "../HelperFiles/data.json"

test('Checkout Overview', async ({ loginAndNavigate,addToCartNavigate, cartNavigate, page }) => {
    const checkoutPage = new Checkout_Page(page)
    await checkoutPage.finishButtonClick()
});