// pages/homePage.js
import { expect } from '@playwright/test';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.banner = this.page.getByText(/^\d+\s+Product\(s\)\s+found$/);
    this.blueTShirtSubTotal = 0;
    this.blackStripedTShirtSubTotal = 0;

  }
  async addFilter() {
    await this.page.locator('label:has(input[value="L"])').click();
    await expect(this.page.locator('input[value="L"]')).toBeChecked();
    await expect(this.banner).toHaveText('10 Product(s) found');
    await this.page.locator('label:has(input[value="XS"])').click();
    await expect(this.page.locator('input[value="XS"]')).toBeChecked();

    await expect(this.banner).toHaveText('11 Product(s) found');
  }
  async verifyFilterResults() {
    const addToCartButtons = this.page.getByRole('button', { name: 'Add to Cart' });
    const bannerText = (await this.banner.innerText()).trim();
    const expectedCount = parseInt(bannerText, 10);
    console.log('Expected count from "Product(s) found:', expectedCount);
    await expect(addToCartButtons).toHaveCount(expectedCount, { timeout: 5000 });
    console.log(`Actual visible product cards: ${await addToCartButtons.count()}`);
  }
  async addBlueTShirtToCart() {
    const addToCartBlueTShirt = this.page
      .locator('.sc-124al1g-2', {
        has: this.page.getByText('Blue T-Shirt', { exact: true }),
      })
      .getByRole('button', { name: 'Add to cart' });

    await addToCartBlueTShirt.click();
  }
  async addBlackStripedTShirtToCart() {
    const addToCartBlackStripedTShirt = this.page
      .locator('.sc-124al1g-2', {
        has: this.page.getByText('Black T-shirt with white stripes', { exact: true }),
      })
      .getByRole('button', { name: 'Add to cart' });

    await addToCartBlackStripedTShirt.click();
  }
  async addBlueTShirtQuantityTwiceAndVerify() {
    const cartBlueTShirt = this.page.locator('.sc-11uohgb-0', {
      has: this.page.getByText('Blue T-Shirt', { exact: true }),
    });

    const addQuantityBlueShirt = cartBlueTShirt.getByRole('button', { name: '+' });

    await addQuantityBlueShirt.click();
    await expect(cartBlueTShirt).toContainText('Quantity: 2');

    await addQuantityBlueShirt.click();
    await expect(cartBlueTShirt).toContainText('Quantity: 3');
  }
  async getExpectCartQuantity() {
    this.totalCartQuantityHeader = this.page
      .locator('.sc-1h98xa9-5', { has: this.page.getByText('Cart', { exact: true }) })
      .locator('.sc-1h98xa9-3');
    const expectedCartQuantityValue = Number(
      (await this.totalCartQuantityHeader.innerText()).trim()
    );
    console.log('Expected cart quantity:', expectedCartQuantityValue);
    return expectedCartQuantityValue;
  }
  async getActualCartQuantity() {
    const cartQuantity = this.page
      .locator('.sc-1h98xa9-1.kQlqIC', {
        has: this.page.getByText('Quantity:'),
      })
      .locator('p:has-text("Quantity:")');

    const count = await cartQuantity.count();
    console.log(`Found ${count} quantity line(s)`);

    let actualQuantity = 0;

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
  async verifyExpectedMatchesActual(expectedCartQuantityValue, actualQuantity) {
    expect(actualQuantity).toBe(expectedCartQuantityValue);
  }

  async clickOnEmptyCart() {
    const removeButton = this.page.getByRole('button', { name: 'remove product from cart' });
    await expect(removeButton.first()).toBeVisible();
    await removeButton.first().click();
    await removeButton.first().click();
  }
  async verifyCartIsEmpty() {
    const fullText = await this.page.locator('#root').innerText();
    const match = fullText.match(/SUBTOTAL\s*\n\s*\$\s*(\d+\.\d{2})/);
    if (!match) {
      throw new Error('Subtotal value not found');
    }
    const subtotalValue = match[1];
    console.log('Extracted subtotal value:', subtotalValue);
    expect(subtotalValue).toBe('0.00');
  }
  async getBlueTShirtSubtotal() {
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
    //console.log('Blue quantity:', blueQuantity);
    //console.log('Blue price:', bluePrice);
    // Multiply 
    this.blueTShirtSubTotal = blueQuantity * bluePrice;
    console.log('Blue T-Shirt subtotal:', this.blueTShirtSubTotal);
  }
  async getBlackStripedTShirtSubtotal() {
    const blackStripedLocator = this.page.getByText(
      'Black T-shirt with white stripesX | Adidas originals Quantity: 1$ 14.90-+'
    );
    // Get full text
    const blackStripedText = await blackStripedLocator.innerText();
    // Parse quantity
    const blackStripedQuantityMatch = blackStripedText.match(/Quantity:\s*(\d+)/);
    const blackStripedQuantity = blackStripedQuantityMatch ? Number(blackStripedQuantityMatch[1]) : 0;
    // Parse price
    const blackStripedPriceMatch = blackStripedText.match(/\$\s*([\d.]+)/);
    const blackStripedPrice = blackStripedPriceMatch ? Number(blackStripedPriceMatch[1]) : 0;
    //console.log('BlackStriped quantity:', blackStripedQuantity);
    //console.log('BlackStriped price:', blackStripedPrice);
    // Multiply
    this.blackStripedTShirtSubTotal = blackStripedQuantity * blackStripedPrice;
    console.log('BlackStriped T-Shirt subtotal:', this.blackStripedTShirtSubTotal);
  }
  async expectedCartSubtotal() {
    const cartTotal = this.blueTShirtSubTotal + this.blackStripedTShirtSubTotal;
    console.log('Expected Cart total:', cartTotal);
    return cartTotal;
  }
  async verifyCartSubtotal() {
    const subtotalLocator = this.page.getByText('SUBTOTAL$ 41.90OR UP TO 7 x');
    // Get full text
    const text = await subtotalLocator.innerText();
    // Parse subtotal price
    const subtotal = Number(text.match(/\$\s*([\d.]+)/)?.[1] || 0);
    console.log('Actual subtotal:', subtotal);
    const cartTotal = await this.expectedCartSubtotal();
    //verify subtotal matches calculated total
    expect(subtotal).toBeCloseTo(cartTotal, 2);
  }
}
