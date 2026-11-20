
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
});

test('Verify cart contains added products', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.cart_item')).toHaveCount(2);

    await expect(page.locator('.inventory_item_name'))
        .toContainText([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light'
        ]);
});

test('Verify removing item from cart', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(1);
});

test('Verify Continue Shopping navigation', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="continue-shopping"]').click();

    await expect(page).toHaveURL(/inventory/);
});

test('Verify cart persists after refreshing page', async ({ page }) =>    {
    await page.locator('.shopping_cart_link').click();

    await page.reload();

    await expect(page.locator('.cart_item')).toHaveCount(2);
});
