import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

let homePage;

test.describe('User is able to verify subtotal matches calculated total', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
  });

  test('TC 06: User is able to verify cart subtotal for Blue T-Shirt and Black Striped T-Shirt', async () => {
    await homePage.addBlueTShirtToCart();
    await homePage.addBlackStripedTShirtToCart();
    await homePage.addBlueTShirtQuantityTwiceAndVerify();
    await homePage.getBlueTShirtSubtotal();
    await homePage.getBlackStripedTShirtSubtotal();
    await homePage.expectedCartSubtotal();
    await homePage.verifyCartSubtotal();
  });
});


