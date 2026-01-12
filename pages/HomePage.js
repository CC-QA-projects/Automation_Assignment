// pages/homePage.js
import { expect } from '@playwright/test';

export class HomePage {
  /**
   * HomePage page object
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Product count banner
    this.banner = this.page.getByText(/^\d+\s+Product\(s\)\s+found$/);

    // Store item subtotals
    this.blueTShirtSubTotal = 0;
    this.blackStripedTShirtSubTotal = 0;
  }

  // Apply size filters and validate banner count
  async addFilter() {
    // Select size L
    await this.page.locator('label:has(input[value="L"])').click();
    await expect(this.page.locator('input[value="L"]')).toBeChecked();
    await expect(this.banner).toHaveText('10 Product(s) found');

    // Select size XS
    await this.page.locator('label:has(input[value="XS"])').click();
    await expect(this.page.locator('input[value="XS"]')).toBeChecked();
    await expect(this.banner).toHaveText('11 Product(s) found');
  }

  // Verify filtered results match banner count
  async verifyFilterResults() {
    // Locate product buttons
    const addToCartButtons = this.page.getByRole('button', { name: 'Add to Cart' });

    // Read banner text
    const bannerText = (await this.banner.innerText()).trim();
    const expectedCount = parseInt(bannerText, 10);

    console.log('Expected count from "Product(s) found:', expectedCount);

    // Validate product count
    await expect(addToCartButtons).toHaveCount(expectedCount, { timeout: 5000 });

    console.log(`Actual visible product cards: ${await addToCartButtons.count()}`);
  }

  // Add Blue T-Shirt to cart
  async addBlueTShirtToCart() {
    // Locate Blue T-Shirt add button
    const addToCartBlueTShirt = this.page
      .locator('.sc-124al1g-2', {
        has: this.page.getByText('Blue T-Shirt', { exact: true }),
      })
      .getByRole('button', { name: 'Add to cart' });

    // Click add to cart
    await addToCartBlueTShirt.click();
  }

  // Add Black Striped T-Shirt to cart
  async addBlackStripedTShirtToCart() {
    // Locate Black Striped T-Shirt add button
    const addToCartBlackStripedTShirt = this.page
      .locator('.sc-124al1g-2', {
        has: this.page.getByText('Black T-shirt with white stripes', { exact: true }),
      })
      .getByRole('button', { name: 'Add to cart' });

    // Click add to cart
    await addToCartBlackStripedTShirt.click();
  }

  // Increase Blue T-Shirt quantity twice and verify
  async addBlueTShirtQuantityTwiceAndVerify() {
    // Locate Blue T-Shirt in cart
    const cartBlueTShirt = this.page.locator('.sc-11uohgb-0', {
      has: this.page.getByText('Blue T-Shirt', { exact: true }),
    });

    const addQuantityBlueShirt = cartBlueTShirt.getByRole('button', { name: '+' });

    // Increase to quantity 2
    await addQuantityBlueShirt.click();
    await expect(cartBlueTShirt).toContainText('Quantity: 2');

    // Increase to quantity 3
    await addQuantityBlueShirt.click();
    await expect(cartBlueTShirt).toContainText('Quantity: 3');
  }

  // Get expected cart quantity from header
  async getExpectCartQuantity() {
    // Locate cart header quantity
    this.totalCartQuantityHeader = this.page
      .locator('.sc-1h98xa9-5', { has: this.page.getByText('Cart', { exact: true }) })
      .locator('.sc-1h98xa9-3');

    const expectedCartQuantityValue = Number(
      (await this.totalCartQuantityHeader.innerText()).trim()
    );

    console.log('Expected cart quantity:', expectedCartQuantityValue);
    return expectedCartQuantityValue;
  }

  // Calculate actual cart quantity from items
  async getActualCartQuantity() {
    // Locate all quantity rows
    const cartQuantity = this.page
      .locator('.sc-1h98xa9-1.kQlqIC', {
        has: this.page.getByText('Quantity:'),
      })
      .locator('p:has-text("Quantity:")');

    const count = await cartQuantity.count();
    console.log(`Found ${count} quantity line(s)`);

    let actualQuantity = 0;

    // Sum each item quantity
    for (let i = 0; i < count; i++) {
      const text = await cartQuantity.nth(i).innerText();
      const match = text.match(/Quantity:\s*(\d+)/);

      if (match) {
        const value = Number(match[1]);
        actualQuantity += value;
      }
    }

    console.log('Actual cart quantity:', actualQuantity);
    return actualQuantity;
  }

  // Compare expected vs actual cart quantity
  async verifyExpectedMatchesActual(expectedCartQuantityValue, actualQuantity) {
    expect(actualQuantity).toBe(expectedCartQuantityValue);
  }

  // Remove all items from cart
  async clickOnEmptyCart() {
    // Locate remove button
    const removeButton = this.page.getByRole('button', { name: 'remove product from cart' });

    // Remove items
    await expect(removeButton.first()).toBeVisible();
    await removeButton.first().click();
    await removeButton.first().click();
  }

  // Verify cart is empty via subtotal
  async verifyCartIsEmpty() {
    // Read full page text
    const fullText = await this.page.locator('#root').innerText();
    const match = fullText.match(/SUBTOTAL\s*\n\s*\$\s*(\d+\.\d{2})/);

    if (!match) {
      throw new Error('Subtotal value not found');
    }

    const subtotalValue = match[1];
    console.log('Extracted subtotal value:', subtotalValue);

    // Validate zero subtotal
    expect(subtotalValue).toBe('0.00');
  }

  // Calculate Blue T-Shirt subtotal
  async getBlueTShirtSubtotal() {
    // Locate Blue T-Shirt line item
    const blueLocator = this.page.getByText(
      'Blue T-ShirtX | Mark Zuck have 365 of this one Quantity: 3$ 9.00-+'
    );

    // Get full text
    const blueText = await blueLocator.innerText();

    // Parse quantity
    const blueQuantityMatch = blueText.match(/Quantity:\s*(\d+)/);
    const blueQuantity = blueQuantityMatch ? Number(blueQuantityMatch[1]) : 0;

    // Parse price
    const bluePriceMatch = blueText.match(/\$\s*([\d.]+)/);
    const bluePrice = bluePriceMatch ? Number(bluePriceMatch[1]) : 0;

    // Multiply quantity and price
    this.blueTShirtSubTotal = blueQuantity * bluePrice;
    console.log('Blue T-Shirt subtotal:', this.blueTShirtSubTotal);
  }

  // Calculate Black Striped T-Shirt subtotal
  async getBlackStripedTShirtSubtotal() {
    // Locate Black Striped T-Shirt line item
    const blackStripedLocator = this.page.getByText(
      'Black T-shirt with white stripesX | Adidas originals Quantity: 1$ 14.90-+'
    );

    // Get full text
    const blackStripedText = await blackStripedLocator.innerText();

    // Parse quantity
    const blackStripedQuantityMatch = blackStripedText.match(/Quantity:\s*(\d+)/);
    const blackStripedQuantity = blackStripedQuantityMatch
      ? Number(blackStripedQuantityMatch[1])
      : 0;

    // Parse price
    const blackStripedPriceMatch = blackStripedText.match(/\$\s*([\d.]+)/);
    const blackStripedPrice = blackStripedPriceMatch ? Number(blackStripedPriceMatch[1]) : 0;

    // Multiply quantity and price
    this.blackStripedTShirtSubTotal = blackStripedQuantity * blackStripedPrice;
    console.log('BlackStriped T-Shirt subtotal:', this.blackStripedTShirtSubTotal);
  }

  // Calculate expected cart subtotal
  async expectedCartSubtotal() {
    const cartTotal = this.blueTShirtSubTotal + this.blackStripedTShirtSubTotal;
    console.log('Expected subtotal:', cartTotal);
    return cartTotal;
  }

  // Verify displayed subtotal matches expected subtotal
  async verifyCartSubtotal() {
    // Locate subtotal text
    const subtotalLocator = this.page.getByText('SUBTOTAL$ 41.90OR UP TO 7 x');

    // Get full text
    const text = await subtotalLocator.innerText();

    // Parse subtotal value
    const subtotal = Number(text.match(/\$\s*([\d.]+)/)?.[1] || 0);
    console.log('Actual subtotal:', subtotal);

    const cartTotal = await this.expectedCartSubtotal();

    // Validate subtotal
    expect(subtotal).toBeCloseTo(cartTotal, 2);
  }
}
