
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
});

test('Verify all 6 products are displayed', async ({ page }) =>    {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('Verify product sorting by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
        .selectOption('lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
});

test('Verify product sorting by price high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
        .selectOption('hilo');

    const prices = await page.locator('.inventory_item_price').allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => b - a));
});

test('Verify sorting products alphabetically A to Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
        .selectOption('az');

    const names = await page.locator('.inventory_item_name').allTextContents();

    expect(names).toEqual([...names].sort());
});

test('Verify sorting products Z to A', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]')
        .selectOption('za');

    const names = await page.locator('.inventory_item_name').allTextContents();

    expect(names).toEqual([...names].sort().reverse());
});

test('Verify cart badge after adding product', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('1');
});

test('Verify removing product from inventory', async ({ page }) =>    {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();

    await page.locator('[data-test="remove-sauce-labs-backpack"]')
        .click();

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveCount(0);
});
