import { test } from '../../Fixtures/LoginAndNavigate';
import { Login_Page } from '../../POM/Login_Page';
import data from '../../HelperFiles/data.json';
import { Product_Page } from '../../POM/Product_Page';
import { expect } from 'playwright/test';

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
    })
    test('Verify filter order Name (Z to A)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.NameZtoA.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(data.productFilters.NameZtoA.filterArray)
    })
    test('Verify filter order Price (low to high)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.PriceLowToHigh.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceLowToHigh.filterArray)

    })
    test('Verify filter order Price (high to low)', async ({ page }) => {
      const productPage = new Product_Page(page)
      const helpers = new Helper(page);

      await productPage.selectFilter(data.productFilters.PriceHighToLow.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(data.productFilters.PriceHighToLow.filterArray)

    })

  })
test.describe('Add Product to cart', () => {
  test('Add a product to cart', async ({loginAndNavigate, page }) => {
      await loginAndNavigate;
      const productPage = new Product_Page(page);
      const helpers = new Helper(page);

      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
  });
  test('Add a muliple product to cart', async ({loginAndNavigate, page }) => {
      await loginAndNavigate;
      const productPage = new Product_Page(page);
      const helpers = new Helper(page);

      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt, data.itemDescriptionName.SauceLabsBikeLight])
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