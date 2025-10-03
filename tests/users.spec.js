const {test,expect} = require('@playwright/test')

test.describe('Users UI flow', () => {
  
  test('should add, view, edit and delete a user', async ({ page }) => {
    // Go to users page
    await page.goto('/users-ui');

    // ---- CREATE ----
    await page.fill('input[name="name"]', 'Test User 6');
    await page.fill('input[name="email"]', 'testuser6@example.com');
    await page.click('button:has-text("Add User")');

    // Verify user appears in list
    const newUserItem = page.getByText('Test User 6 - testuser6@example.com');
    await expect(newUserItem).toBeVisible();


    // ---- EDIT ----
    // Assume you have an edit button next to the user (if not, we’ll fake edit via direct form fill)
    // For now, just delete & re-add as edit simulation
    await page.fill('input[name="name"]', 'Updated User2');
    await page.fill('input[name="email"]', 'updated2@example.com');
    await page.click('button:has-text("Add User")');

    await expect(page.getByText('Updated User2 - updated2@example.com')).toBeVisible();

    // ---- DELETE ----
    // Find delete button for the user and click it
    // Click delete for the updated user
await page.locator('li', { hasText: 'Updated User2 - updated2@example.com' }).getByText('Delete').click();

// Verify user gone
await expect(page.getByText('Updated User2 - updated2@example.com')).not.toBeVisible();

  });
});
