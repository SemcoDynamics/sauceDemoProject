import { test } from '../../Fixtures/LoginAndNavigate';
import { Login_Page } from '../../POM/Login_Page';
import data from '../../HelperFiles/data.json';
import { Product_Page } from '../../POM/Product_Page';
import { Helper } from '../../HelperFiles/Helper';
import { expect } from 'playwright/test';
import { argosScreenshot } from "@argos-ci/playwright";

test.describe('Filter selection', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new Login_Page(page)
    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)

  });
  
    test('Verify filter order (A to Z)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.NameAtoZ.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(data.productFilters.NameAtoZ.filterArray)
       await helpers.screenShotPage("filter Z to A.png", 0.12)
       await argosScreenshot(page, "filter Z to A.png");
    })
    test('Verify filter order Name (Z to A)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.NameZtoA.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(data.productFilters.NameZtoA.filterArray)
       await helpers.screenShotPage("filter Z to A.png", 0.12)
       await argosScreenshot(page, "filter Z to A.png");

    })
    test('Verify filter order Price (low to high)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.PriceLowToHigh.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceLowToHigh.filterArray)
       await helpers.screenShotPage("filter low to high.png", 0.02)
       await argosScreenshot(page, "filter low to high.png");


    })
    test('Verify filter order Price (high to low)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.PriceHighToLow.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceHighToLow.filterArray)
       await helpers.screenShotPage("filter high to low.png", 0.02)
       await argosScreenshot(page, "filter high to low.png");


    })

  })
test.describe('Add Product to cart', () => {
  test('Add a product to cart', async ({loginAndNavigate, page }) => {
      await loginAndNavigate;
      const productPage = new Product_Page(page);
      const helpers = new Helper(page);

      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
      await helpers.screenShotPage("Single products added to cart.png", 0.02)
      await argosScreenshot(page, "Single products added to cart.png");

  });
  test('Add a muliple product to cart', async ({loginAndNavigate, page }) => {
      await loginAndNavigate;
      const productPage = new Product_Page(page);
      const helpers = new Helper(page);

      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt, data.itemDescriptionName.SauceLabsBikeLight])
      await helpers.screenShotPage("Multiple products added to cart.png", 0.02)
      await argosScreenshot(page, "Multiple products added to cart.png");

    })
})
test.describe('View product description', () => {
  test('Select product description', async ({loginAndNavigate, page }) => {
    await loginAndNavigate;
    const productPage = new Product_Page(page);
    const helpers = new Helper(page);

    await productPage.inventoryItemName.filter({hasText: data.itemDescriptionName.SauceLabsBikeLight}).click()
    await expect(productPage.inventoryItemName).toHaveText(data.itemDescriptionName.SauceLabsBikeLight)
    await expect(productPage.productDescriptionBody).toHaveText(data.productDescriptionBodyText.BikeLight)
    await helpers.screenShotPage("Correct body.png", 0.02)
    await argosScreenshot(page, "Correct body.png");

  });
  test('Add to cart from product description page', async ({loginAndNavigate, page}) => {
    await loginAndNavigate;
    const productPage = new Product_Page(page);

    await productPage.inventoryItemName.filter({hasText: data.itemDescriptionName.SauceLabsBikeLight}).click()
    await productPage.addToCartButton.click()
    await expect(productPage.cardBadge).toHaveText('1')
    await expect(productPage.removeButton).toHaveText('Remove')
  });
  
test.describe('Verify social links', async () => {
  const socialLinks = ['[data-test="social-twitter"]', '[data-test="social-facebook"]', '[data-test="social-linkedin"]']
    
  for(let i = 0; i < socialLinks.length; i++){
    test(`Verify social link ${socialLinks[i]} resolve correctly`, async ({loginAndNavigate, page }) => {
      await loginAndNavigate;
      await page.locator(socialLinks[i]).click()
    })
  }
    
  })
  
})