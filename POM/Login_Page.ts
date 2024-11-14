import {Locator, Page} from "@playwright/test"

export class Login_Page {

    readonly page: Page
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator

    constructor(page: Page){
        this.page = page;
        // fields
        this.usernameField =  page.getByRole("textbox", {name: "Username"})
        this.passwordField = page.getByRole("textbox", {name: "Password"})
        // buttons
        this.loginButton = page.getByRole("button", {name: "Login"})
    }

    async LoginForm(envURL: string ,username: string, password: string) {
        await this.page.goto(envURL)
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
}