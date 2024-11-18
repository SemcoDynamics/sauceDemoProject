import { Locator, Page } from "playwright-core";

export class  YourCart_Page {
    readonly page: Page;
    readonly inventoryItem: Locator;
    //buttons
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem =  page.locator('[data-test="inventory-item"]');
        //button
        this.checkoutButton = page.getByRole('button', {name:'Checkout'});
        this.continueShoppingButton = page.getByRole('button', {name:'Continue Shopping'})
        this.removeButton = page.getByRole('button', {name: 'Remove'})
    }

}