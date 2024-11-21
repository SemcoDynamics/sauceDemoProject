import { expect, test as base } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json'
import { Product_Page } from '../POM/Product_Page';
import { YourCart_Page } from '../POM/YourCart_Page';
import { Checkout_Page } from '../POM/Checkout_Page';
import { Checkout_Page } from '../POM/Checkout_Page';

// Define common fixtures
export const test = base.extend({
  loginAndNavigate: async ({ page }, use) => {
    const loginPage = new Login_Page(page);
    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await use(page);
  },

  addToCartNavigate: async ({ loginAndNavigate, page }, use) => {
    await loginAndNavigate;
    const productPage = new Product_Page(page)
    await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
    await productPage.cardBadge.click()
    await use(page)
  },
  cartNavigate: async ({loginAndNavigate, addToCartNavigate, page }, use) => {
    await loginAndNavigate;
    await addToCartNavigate;
    const cartPage = new YourCart_Page(page);
    await cartPage.checkoutButton.click()
    await use(page)
  },
<<<<<<< HEAD
  checkoutYourInfoNavigate: async ({loginAndNavigate, addToCartNavigate, cartNavigate, page }, use) => {
=======
  checkoutNavigate: async ({loginAndNavigate, addToCartNavigate, cartNavigate, page }, use) => {
>>>>>>> 3d2d69cb28a31978d4e633152958a514d957e9ca
    await loginAndNavigate;
    await addToCartNavigate;
    await cartNavigate;
    const checkoutPage = new Checkout_Page(page);
<<<<<<< HEAD
    const cartPage = new YourCart_Page(page);
    await checkoutPage.checkoutForm(data.formDetails.firstnames[1], data.formDetails.lastnames[2], data.formDetails.postalCode[3]);
    await checkoutPage.continueButton.click();
    await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
    await expect(cartPage.inventoryItem).toContainText('$15.99');
=======
    const cartPage = new YourCart_Page(page)
    await checkoutPage.checkoutForm(data.formDetails.firstnames[1], data.formDetails.lastnames[2], data.formDetails.postalCode[3])
    await checkoutPage.continueButton.click()
    await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
    await expect(cartPage.inventoryItem).toContainText('$15.99')
    await checkoutPage.finishButton.click()
>>>>>>> 3d2d69cb28a31978d4e633152958a514d957e9ca
    await use(page)
  },
})
