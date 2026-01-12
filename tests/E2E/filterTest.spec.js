import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

let homePage;

test.describe('User is able to filter the products by size', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
  });
  
  test('TC 05: User filters products by L and XS', async () => {
    await homePage.addFilter();
    await homePage.verifyFilterResults();
  });
});

