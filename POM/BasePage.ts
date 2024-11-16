import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly inventoryItemName: Locator;
  constructor(page: Page) {
    this.page = page;
    //Headers
    this.inventoryItemName =  page.locator('[data-test="inventory-item-name"]');
  }

}
