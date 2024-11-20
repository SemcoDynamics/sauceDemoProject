import { Locator, Page } from "@playwright/test";

export class Checkout_Page {
    readonly page: Page;
    readonly formFirstName: Locator;
    readonly formLastName: Locator;
    readonly formpostalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly paymentInfo: Locator;
    readonly paymentId: Locator;
    readonly finishButton: Locator;

    constructor(page: Page){
        this.page = page;
        //Checkout: Your Information
        this.formFirstName = page.getByPlaceholder('First Name');
        this.formLastName = page.getByPlaceholder('Last Name');
        this.formpostalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {name:"Continue"});
        this.cancelButton = page.getByRole('button', {name:"Cancel"});
        //Checkout: Overview
        this.paymentInfo = page.locator('[data-test="cart-list"]');
        this.paymentId =  page.locator('[data-test="payment-info-value"]')
        this.finishButton = page.getByRole('button', {name:'Finish'});


    }
    async checkoutForm(firstName: string, lastName: string, postalCode: string) {
        const checkoutPage = new Checkout_Page(this.page)
        await checkoutPage.formFirstName.fill(firstName);
        await checkoutPage.formLastName.fill(lastName);
        await checkoutPage.formpostalCode.fill(postalCode)
        
    }
    async paymentIdNumber(): Promise<string | null> {
         return await this.paymentId.textContent(); 
    }
    async finishButtonClick(){
        await this.finishButton.click();
    }
}