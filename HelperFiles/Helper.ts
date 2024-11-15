import { Locator, Page, expect } from "@playwright/test";

export class Helper{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;

    }
    async screenShotPage(screenshotFileName: string, pixels: number){
        await expect(this.page).toHaveScreenshot(screenshotFileName, {fullPage: true, maxDiffPixelRatio: pixels, animations:'allow'});
    }
}