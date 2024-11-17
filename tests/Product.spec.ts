import { test } from '../Fixtures/LoginAndNavigate';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json';
import { Product_Page } from '../POM/Product_Page';
import { Helper } from '../HelperFiles/Helper';
import { expect } from 'playwright/test';

test.describe('Filter selection', () => {
    test('Verify filter order (A to Z)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.NameAtoZ.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(data.productFilters.NameAtoZ.filterArray)
       await helpers.screenShotPage("filter Z to A.png", 0.12)
    })
    test('Verify filter order Name (Z to A)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.NameZtoA.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(data.productFilters.NameZtoA.filterArray)
       await helpers.screenShotPage("filter Z to A.png", 0.02)
    })
    test('Verify filter order Price (low to high)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.PriceLowToHigh.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceLowToHigh.filterArray)
       await helpers.screenShotPage("filter low to high.png", 0.02)

    })
    test('Verify filter order Price (high to low)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.PriceHighToLow.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceHighToLow.filterArray)
       await helpers.screenShotPage("filter high to low.png", 0.02)

    })

  })
  test.describe('Add Product to cart', () => {
    test('Add a product to cart', async ({ page }) => {
      const loginPage = new Login_Page(page);
      const productPage = new Product_Page(page);
      const helpers = new Helper(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
      await helpers.screenShotPage("Single products added to cart.png", 0.02)
  });
  test('Add a muliple product to cart', async ({ page }) => {
    const loginPage = new Login_Page(page);
    const productPage = new Product_Page(page);
    const helpers = new Helper(page);

    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt, data.itemDescriptionName.SauceLabsBikeLight])
    await helpers.screenShotPage("Multiple products added to cart.png", 0.02)
  })
})
test.describe('View product description', () => {
  test('Select product description', async ({ page }) => {
    const loginPage = new Login_Page(page);
    const productPage = new Product_Page(page);
    const helpers = new Helper(page);

    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await productPage.inventoryItemName.filter({hasText: data.itemDescriptionName.SauceLabsBikeLight}).click()
    await expect(productPage.inventoryItemName).toHaveText(data.itemDescriptionName.SauceLabsBikeLight)
    await expect(productPage.productDescriptionBody).toHaveText(data.productDescriptionBodyText.BikeLight)
    await helpers.screenShotPage("Correct body.png", 0.02)
  });
  test('Add to cart from product description page', async ({loginAndNavigate}) => {
    //const loginPage = new Login_Page(page);
    const productPage = new Product_Page(loginAndNavigate);

    //await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await productPage.inventoryItemName.filter({hasText: data.itemDescriptionName.SauceLabsBikeLight}).click()
    await productPage.addToCartButton.click()
    await expect(productPage.cardBadge).toHaveText('1')
  });
  test.describe('Verify social links', async () => {
    const socialLinks = ['[data-test="social-twitter"]', '[data-test="social-facebook"]', '[data-test="social-linkedin"]']
    
    for(let i = 0; i < socialLinks.length; i++){
      test(`Verify social link ${socialLinks[i]} resolve correctly`, async ({ page }) => {
        const loginPage = new Login_Page(page);
        await loginPage.LoginForm("/", data.users.standard, data.password);
        await page.locator(socialLinks[i]).click()
      })
    }
    
  })
  
})