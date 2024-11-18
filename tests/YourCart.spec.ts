import {test} from '../Fixtures/LoginAndNavigate';
import { expect } from 'playwright/test';
import { Product_Page } from '../POM/Product_Page';
import { YourCart_Page } from '../POM/YourCart_Page';

test.describe('Cart', () => {
    test('View your cart', async ({addToCartNavigate, page}) => {
        const cartPage = new YourCart_Page(addToCartNavigate);
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await cartPage.checkoutButton.click()
    });  
    test('Remove product from cart page', async ({ addToCartNavigate ,page }) => {
        const cartPage = new YourCart_Page(addToCartNavigate);
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await cartPage.removeButton.click()
        await expect(cartPage.inventoryItem).toBeHidden()
});
    test('Go back to Product page from your cart page', async ({addToCartNavigate, page }) => {
        const cartPage = new YourCart_Page(addToCartNavigate);
        await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
        await cartPage.continueShoppingButton.click()
    });
    

});


