import { expect, test as base } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json'

// Define common fixtures
export const test = base.extend({
  loginAndNavigate: async ({ page }, use) => {
    const loginPage = new Login_Page(page);
    await loginPage.LoginForm(data.env.bURL, data.users.standard, data.password);
    await use(page);
  },
});
