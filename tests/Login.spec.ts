import { test, expect } from '@playwright/test';
import { Login_Page } from '../POM/Login_Page';
import data from '../HelperFiles/data.json';
import { Product_Page } from '../POM/Product_Page';

test.describe('Login with different accounts', async () => {
  const usernames = [data.users.standard, data.users.error, data.users.locked, data.users.performanceGlitch, data.users.problem, data.users.visual];

for (let i = 0; i < usernames.length; i++) {
  test(`Login to Sauce Demo as a ${usernames[i]}`,{tag:"@fast"}, async ({ page }) => {
    const loginPage = new Login_Page(page)
    await page.goto("/")
    await loginPage.LoginForm("/", `${usernames[i]}`, data.password)
  });
}

})



