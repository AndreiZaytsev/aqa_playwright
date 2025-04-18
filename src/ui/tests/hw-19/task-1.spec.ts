import test, { expect } from "@playwright/test";

enum HeaderText {
  DYNAMIC_CONTROLS = "Dynamic Controls",
  REMOVE_ADD = "Remove/add",
  ENABLE_DISABLE = "Enable/disable",
}

test.describe("[UI] [Heroku] Dynamic controls", () => {
  test.beforeEach(async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    const dynamic_controlsLink = page.locator('[href="/dynamic_controls"]');
    await dynamic_controlsLink.click();
  });

  test("Dynamic controls check", async ({ page }) => {
    const removeButton = page.getByRole("button", { name: "Remove" });
    await removeButton.waitFor({ state: "visible" });
    const headers = page.locator("h4");

    await expect(headers.nth(0)).toHaveText(HeaderText.DYNAMIC_CONTROLS);
    await expect(headers.nth(1)).toHaveText(HeaderText.ENABLE_DISABLE);
    await expect(headers.nth(2)).toHaveText(HeaderText.REMOVE_ADD);

    const checkbox = page.locator("#checkbox");
    await checkbox.click();
    await removeButton.click();
    await removeButton.waitFor({ state: "hidden" });

    const addButton = page.getByRole("button", { name: "Add" });
    await removeButton.waitFor({ state: "attached" });
    const textLocatorAfterRemoveButtonClick = page.locator("#message");
    await expect(textLocatorAfterRemoveButtonClick).toHaveText("It's gone!");
    await addButton.click();

    await checkbox.waitFor({ state: "visible" });
    const textLocatorAfterAddButtonClick = page.locator("#message");
    await expect(textLocatorAfterAddButtonClick).toHaveText("It's back!");
  });
});
