import { expect, test as base } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json'
import { Product_Page } from '../POM/Product_Page';
import { YourCart_Page } from '../POM/YourCart_Page';

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

})
