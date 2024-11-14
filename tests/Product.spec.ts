import { test, expect } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json';
import { Product_Page } from '../POM/Product_Page';

test.describe('Filter selection', () => {
    test('Verify filter order (A to Z)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.NameAtoZ)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      const filterContent = [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)"
       ]
       expect(filterContent).toEqual(inventoryItemArray)
    })
    test('Verify filter order Name (Z to A)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.NameZtoA)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      const filterContent = [
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Onesie",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Bike Light",
        "Sauce Labs Backpack"
       ]
       expect(filterContent).toEqual(inventoryItemArray)
    })
    test('Verify filter order Price (low to high)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.PriceLowToHigh)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      const filterContent = [
        "Sauce Labs Onesie",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Backpack",
        "Sauce Labs Fleece Jacket"
       ]
       expect(filterContent).toEqual(inventoryItemArray)
    })
    test('Verify filter order Price (high to low)', async ({ page }) => {
      const loginPage = new Login_Page(page)
      const productPage = new Product_Page(page)
      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password)
      await productPage.selectFilter(data.productFilters.PriceHighToLow)
      const inventoryItemArray = await productPage.inventoryItemName.allTextContents()
      const filterContent = [
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Backpack",
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Bike Light",
        "Sauce Labs Onesie"
       ]
       expect(filterContent).toEqual(inventoryItemArray)
    })

  })
  test.describe('Add Product to cart', () => {
    test('Add a product to cart', async ({ page }) => {
      const loginPage = new Login_Page(page);
      const productPage = new Product_Page(page);

      await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
      await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt]);
  });
  test('Add a muliple product to cart', async ({ page }) => {
    const loginPage = new Login_Page(page);
    const productPage = new Product_Page(page);

    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await productPage.selectProductHeaderAndAddToCart([data.itemDescriptionName.SauceLabsBoltTShirt, data.itemDescriptionName.SauceLabsBikeLight])
  })
})
test.describe('View product description', () => {
  test('Select product description', async ({ page }) => {
    const loginPage = new Login_Page(page);
    const productPage = new Product_Page(page);
    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await productPage.inventoryItemName.filter({hasText: data.itemDescriptionName.SauceLabsBikeLight}).click()
    await expect(productPage.inventoryItemName).toHaveText(data.itemDescriptionName.SauceLabsBikeLight)
    await expect(productPage.productDescriptionBody).toHaveText(data.productDescriptionBodyText.BikeLight)
  })
  
  
})
