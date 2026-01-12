import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

let homePage;

test.describe('Add, update and delete items in the cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
  });

  test.describe('Add items to cart', () => {
    test('TC 01: User is able to add items to cart', async () => {
      await homePage.addBlueTShirtToCart();
      await homePage.addBlackStripedTShirtToCart();
    });
  });

  test.describe('Update cart quantity', () => {
    test('TC 02: User is able to update Blue T-Shirt quantity', async () => {
      await homePage.addBlueTShirtToCart();
      await homePage.addBlueTShirtQuantityTwiceAndVerify();
    });
  });

  test.describe('Verify cart quantity', () => {
    test('TC 03: User is able to verify cart quantity', async () => {
      await homePage.addBlueTShirtToCart();
      await homePage.addBlackStripedTShirtToCart();
      await homePage.addBlueTShirtQuantityTwiceAndVerify();
      const expected = await homePage.getExpectCartQuantity();
      const actual = await homePage.getActualCartQuantity();
      await homePage.verifyExpectedMatchesActual(expected, actual);
    });
  });

  test.describe('Delete items from cart', () => {
    test('TC 04:User is able to remove items from cart', async ({ page }) => {
      await homePage.addBlueTShirtToCart();
      await homePage.addBlackStripedTShirtToCart();
      await homePage.clickOnEmptyCart();
      await homePage.verifyCartIsEmpty();
    });
  });
});

