import { expect, test as base } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json'
import { Product_Page } from '../POM/Product_Page';
import { YourCart_Page } from '../POM/YourCart_Page';
import { Checkout_Page } from '../POM/Checkout_Page';

type MyFixtures = {
  loginPage: Login_Page;
  productPage: Product_Page;
  cartPage: YourCart_Page;
  checkoutPage: Checkout_Page;
};

// Define common fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new Login_Page(page);
    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await use(loginPage);
  },

  productPage: async ({ loginPage, page }, use) => {
    const productPage = new Product_Page(page)
    await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
    await productPage.cardBadge.click()
    await use(productPage)
  },
  cartPage: async ({loginPage, productPage, page }, use) => {
    const cartPage = new YourCart_Page(page);
    await cartPage.checkoutButton.click()
    await use(cartPage)
  },
  checkoutPage: async ({loginPage, productPage, cartPage, page }, use) => {
    const checkoutPage = new Checkout_Page(page);
    await checkoutPage.checkoutForm(data.formDetails.firstnames[1], data.formDetails.lastnames[2], data.formDetails.postalCode[3])
    await checkoutPage.continueButton.click()
    await expect(cartPage.inventoryItem).toContainText('Sauce Labs Bolt T-Shirt');
    await expect(cartPage.inventoryItem).toContainText('$15.99')
    await checkoutPage.finishButton.click()
    await use(checkoutPage)
  },
})
