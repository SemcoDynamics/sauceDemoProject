import { test } from '../../Fixtures/LoginAndNavigate';
import { Login_Page } from '../../POM/Login_Page';
import users from '../../HelperFiles/data.json';
import { Product_Page } from '../../POM/Product_Page';
import { expect } from 'playwright/test';

test.describe('Filter selection', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new Login_Page(page)
    await loginPage.LoginForm(users.env.bURL, users.users.standard, users.password)

  });
  
    test('Verify filter order (A to Z)', {tag:['@PRODUCT']}, async ({ page }) => {
      const productPage = new Product_Page(page)

      await productPage.selectFilter(users.productFilters.NameAtoZ.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(users.productFilters.NameAtoZ.filterArray)
    })
    test('Verify filter order Name (Z to A)', {tag:['@PRODUCT']}, async ({ page }) => {
      const productPage = new Product_Page(page)

      await productPage.selectFilter(users.productFilters.NameZtoA.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()

       expect(inventoryItemArray).toEqual(users.productFilters.NameZtoA.filterArray)
    })
    test('Verify filter order Price (low to high)', {tag:['@PRODUCT']}, async ({ page }) => {
      const productPage = new Product_Page(page)

      await productPage.selectFilter(users.productFilters.PriceLowToHigh.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(users.productFilters.PriceLowToHigh.filterArray)

    })
    test('Verify filter order Price (high to low)', {tag:['@PRODUCT']}, async ({ page }) => {
      const productPage = new Product_Page(page)

      await productPage.selectFilter(users.productFilters.PriceHighToLow.filterValue)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      console.log(inventoryItemArray)

       expect(inventoryItemArray).toEqual(users.productFilters.PriceHighToLow.filterArray)

    })

  })
test.describe('Add Product to cart', () => {
  test('Add a product to cart', {tag:['@PRODUCT']}, async ({ loginPage, page }) => {
      const productPage = new Product_Page(page);

      await productPage.selectProductHeaderAndAddToCart([users.itemDescriptionName.SauceLabsBoltTShirt]);
  });
  test('Add a muliple product to cart', {tag:['@PRODUCT']}, async ({ loginPage, page }) => {
      const productPage = new Product_Page(page);

      await productPage.selectProductHeaderAndAddToCart([users.itemDescriptionName.SauceLabsBoltTShirt, users.itemDescriptionName.SauceLabsBikeLight])
    })
})
test.describe('View product description', () => {
  test('Select product description', {tag:['@PRODUCT']}, async ({ loginPage, page }) => {
    const productPage = new Product_Page(page);

    await productPage.inventoryItemName.filter({hasText: users.itemDescriptionName.SauceLabsBikeLight}).click()
    await expect(productPage.inventoryItemName).toHaveText(users.itemDescriptionName.SauceLabsBikeLight)
    await expect(productPage.productDescriptionBody).toHaveText(users.productDescriptionBodyText.BikeLight)
  });
  test('Add to cart from product description page', {tag:['@PRODUCT']}, async ({ loginPage, page}) => {
    const productPage = new Product_Page(page);

    await productPage.inventoryItemName.filter({hasText: users.itemDescriptionName.SauceLabsBikeLight}).click()
    await productPage.addToCartButton.click()
    await expect(productPage.cardBadge).toHaveText('1')
    await expect(productPage.removeButton).toHaveText('Remove')
  });
  
test.describe('Verify social links', {tag:['@PRODUCT']}, async () => {
  const socialLinks = ['[data-test="social-twitter"]', '[data-test="social-facebook"]', '[data-test="social-linkedin"]']
    
  for(let i = 0; i < socialLinks.length; i++){
    test(`Verify social link ${socialLinks[i]} resolve correctly`, async ({ loginPage, page }) => {
      await page.locator(socialLinks[i]).click()
    })
  }
    
  })
  
})