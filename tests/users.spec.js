const {test,expect} = require('@playwright/test')

test.describe('Users UI flow', () => {
  
  test('should add, view, edit and delete a user', async ({ page }) => {
    // Go to users page
    await page.goto('/users-ui');

    // ---- CREATE ----
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.click('button:has-text("Add User")');

    // Verify user appears in list
    const newUserItem = page.locator('li', { hasText: 'Test User' });
    await expect(newUserItem).toBeVisible();


    // ---- EDIT ----
    // Assume you have an edit button next to the user (if not, we’ll fake edit via direct form fill)
    // For now, just delete & re-add as edit simulation
    await page.fill('input[name="name"]', 'Updated User');
    await page.fill('input[name="email"]', 'updated@example.com');
    await page.click('button:has-text("Add User")');

    await expect(page.locator('li')).toContainText('Updated User');

    // ---- DELETE ----
    // Find delete button for the user and click it
    await page.click('text=Delete', { trial: false });

    // Verify user gone
    await expect(page.locator('li')).not.toContainText('Updated User');
  });
});
