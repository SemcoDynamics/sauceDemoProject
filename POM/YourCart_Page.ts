import { Locator, Page } from "playwright-core";

export class  YourCart_Page {
    readonly page: Page;
    readonly inventoryItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem =  page.locator('[data-test="inventory-item"]')
    }
}