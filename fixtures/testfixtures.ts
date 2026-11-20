import { test as base, expect } from '@playwright/test';

type MyFixtures = {
    loggedInPage: void;
};

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ page }, use) => {

        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="username"]')
            .fill('standard_user');

        await page.locator('[data-test="password"]')
            .fill('secret_sauce');

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page.locator('.title'))
            .toHaveText('Products');

        await use();
    }
});

export { expect };