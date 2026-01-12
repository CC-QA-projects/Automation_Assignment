BDD Format: 
----------------------------------------------------
Feature: E2E Testing scenarios 

  TC-01: Add items to cart
  Scenario: TC-01 User adds items to cart
    Given the user navigates to the URL
    When the user adds "Blue T-Shirt" to the cart
    And the user adds "Black T-shirt with white stripes" to the cart
    Then both items should be displayed in the cart


  TC-02: Update item quantity in cart
  Scenario: TC-02 User updates Blue T-Shirt quantity
    Given the user navigates to the URL
    And the user adds "Blue T-Shirt" to the cart
    When the user increases the quantity of "Blue T-Shirt" by 2
    Then the quantity of "Blue T-Shirt" should be updated correctly


  TC-03: Verify cart quantity
  Scenario: TC-03 User verifies cart quantity
    Given the user navigates to the URL
    And the user adds "Blue T-Shirt" and "Black T-shirt with white stripes" to the cart
    And the user increases the quantity of "Blue T-Shirt" by 2
    When the user retrieves the expected cart quantity
    And the user retrieves the actual cart quantity from the cart
    Then the expected quantity should match the actual quantity


  TC-04: Remove items from cart
  Scenario: TC-04 User removes all items from the cart
    Given the user navigates to the URL
    And the user adds "Blue T-Shirt" and "Black T-shirt with white stripes" to the cart
    When the user empties the cart
    Then the cart should be empty


  TC-05: Filter products by size
  Scenario: TC-05 User filters products by L and XS
    Given the user navigates to the URL
    When the user applies a size filter
    Then only products matching the selected size should be displayed


  TC-06: Verify subtotal equals calculated total
  Scenario: TC-06 User is able to verify cart subtotal for 2 Blue T-Shirt and Black Striped T-Shirt
    Given the user navigates to the URL
    When the user adds "2 Blue T-Shirt" and "Black T-shirt with white stripes" to the cart
    Then the Expected Total should equal the subtotal

  TC-07: Decrease item quantity (EXTRA)
  Scenario: TC-07 User decreases Blue T-Shirt quantity
    Given the user navigates to the URL
    And the user adds "2 Blue T-Shirt" to the cart
    When the user decreases the quantity of "Blue T-Shirt" by 1
    Then the quantity of "Blue T-Shirt" should be updated to "1" 

  TC-08: Verify subtotal after removing an item (EXTRA)
  Scenario: TC-09 User verifies subtotal after removing an item
    Given the user navigates to the URL
    And the user adds "Blue T-Shirt" and "Black T-shirt with white stripes" to the cart
    And the user increases the quantity of "Blue T-Shirt" by 1
    When the user removes "Black T-shirt with white stripes" from the cart
    Then the subtotal should equal the total price of the remaining cart items 


Test cases with steps
-------------------------------------------------

TC-01: Add items to cart
Objective: Verify user can add multiple items to the cart.

1. Navigate to the application URL
   Expected Result: Product listing page loads successfully.

2. Add “Blue T-Shirt” to the cart
   Expected Result: Blue T-Shirt appears in the cart with quantity 1.

3. Add “Black T-shirt with white stripes” to the cart
   Expected Result: Both items are displayed in the cart.

--------------------------------------------------

TC-02: Update item quantity in cart
Objective: Verify user can update item quantity in the cart.

1. Navigate to the application URL and add “Blue T-Shirt” to the cart
   Expected Result: Blue T-Shirt appears in the cart with quantity 1.

2. Increase the quantity of “Blue T-Shirt” by 2
   Expected Result: Quantity increments are applied successfully.

3. Verify the quantity of “Blue T-Shirt”
   Expected Result: Quantity is updated to 3.

--------------------------------------------------

TC-03: Verify cart quantity
Objective: Verify expected cart quantity matches actual cart quantity.

1. Add “Blue T-Shirt” and “Black T-shirt with white stripes” to the cart and increase Blue T-Shirt quantity by 2
   Expected Result: Blue T-Shirt quantity is 3 and Black T-shirt quantity is 1.

2. Retrieve the expected cart quantity
   Expected Result: Expected cart quantity is 4.

3. Retrieve the actual cart quantity from the cart
   Expected Result: Actual cart quantity matches the expected quantity (4).

--------------------------------------------------

TC-04: Remove items from cart
Objective: Verify user can remove all items from the cart.

1. Navigate to the application URL and add “Blue T-Shirt” and “Black T-shirt with white stripes” to the cart
   Expected Result: Both items are displayed in the cart.

2. Remove all items from the cart
   Expected Result: All items are removed successfully.

3. Verify the cart state
   Expected Result: Cart is empty and no items are displayed.

--------------------------------------------------

TC-05: Filter products by size
Objective: Verify products can be filtered by size.

1. Navigate to the application URL
   Expected Result: Product listing page loads and Product(s) found banner is visible.

2. Apply size filters L and XS
   Expected Result: Selected filters are applied and product results refresh.

3. Verify displayed products
   Expected Result: Only products matching the selected sizes are displayed.

--------------------------------------------------

TC-06: Verify subtotal equals calculated total
Objective: Verify cart subtotal matches calculated total.

1. Navigate to the application URL
   Expected Result: Product listing page loads successfully.

2. Add 2 Blue T-Shirt and 1 Black T-shirt with white stripes to the cart
   Expected Result: Correct items and quantities are displayed in the cart.

3. Compare calculated total with cart subtotal
   Expected Result: Calculated total equals the displayed cart subtotal. 

TC-07 (EXTRA): Decrease item quantity
Objective: Verify user can decrease the quantity of an item in the cart.

1. Navigate to the application URL
   Expected Result: Product listing page loads successfully.

2. Add 2 × Blue T-Shirt to the cart
   Expected Result: Blue T-Shirt appears in the cart with quantity 2.

3. Decrease the quantity of Blue T-Shirt by 1
   Expected Result: Quantity is updated to 1 and reflected correctly in the cart.

--------------------------------------------------

TC-08 (EXTRA): Verify subtotal after removing an item
Objective: Verify cart subtotal updates correctly after an item is removed.

1. Navigate to the application URL
   Expected Result: Product listing page loads successfully.

2. Add Blue T-Shirt and Black T-shirt with white stripes to the cart
   Expected Result: Both items appear in the cart with quantity 1 each.

3. Increase the quantity of Blue T-Shirt by 1
   Expected Result: Blue T-Shirt quantity is updated to 2.

4. Remove Black T-shirt with white stripes from the cart
   Expected Result: Black T-shirt with white stripes is removed from the cart.

5. Verify the cart subtotal
   Expected Result: Subtotal equals the total price of Blue T-Shirt × 2 only.

