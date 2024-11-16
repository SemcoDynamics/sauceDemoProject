import { Locator, Page } from "@playwright/test";

export class Product_Page {
    readonly page: Page;
    readonly filterSelector: Locator;
    readonly inventoryItemName: Locator;
    readonly productDescriptionBody: Locator;
    readonly addToCartButton: Locator;
    readonly cardBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        //Dropdowns
        this.filterSelector = page.locator('[data-test="product-sort-container"]');

        //Headers
        this.inventoryItemName =  page.locator('[data-test="inventory-item-name"]');

        //Text
        this.productDescriptionBody = page.locator('[data-test="inventory-item-desc"]');

        //Button
        this.addToCartButton = page.locator('button').filter({hasText:'Add to Cart'});

        //Labels
        this.cardBadge = page.locator('[data-test="shopping-cart-badge"]');
    }
    async selectFilter(filterName: string) {
        await this.filterSelector.click();
        await this.filterSelector.selectOption(filterName);
    }

    async selectProductHeaderAndAddToCart(productNames: string[]) {
      const inventoryItemNames = await this.inventoryItemName.allTextContents();
      for (const productName of productNames) {
        for(let i = 0; i < inventoryItemNames.length; i++) {
          if(inventoryItemNames[i] === productName) {

            await this.inventoryItemName.nth(i).hover();
            await this.addToCartButton.nth(i).click();
            break;
        }
      }
    }
  }
}