import { Locator, Page } from "@playwright/test";

export class Checkout_Page {
    readonly page: Page;
    readonly formFirstName: Locator;
    readonly formLastName: Locator;
    readonly formpostalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.formFirstName = page.getByPlaceholder('First Name');
        this.formLastName = page.getByPlaceholder('Last Name');
        this.formpostalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {name:"Continue"});
        this.cancelButton = page.getByRole('button', {name:"Cancel"});
    }
    async checkoutForm(firstName: string, lastName: string, postalCode: string) {
        const checkoutPage = new Checkout_Page(this.page)
        await checkoutPage.formFirstName.fill(firstName);
        await checkoutPage.formLastName.fill(lastName);
        await checkoutPage.formpostalCode.fill(postalCode)
        
    }
}