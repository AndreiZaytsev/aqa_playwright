import test, { expect } from "@playwright/test";

test.describe("[UI] [anatoly-karpovich] Task-2", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
  });

  test("App login", async ({ page }) => {
    const loginLocator = page.locator("#emailinput");
    const passwordLocator = page.locator("#passwordinput");
    const loginButton = page.getByRole("button", { name: "Login" });
    await loginLocator.fill("test@gmail.com");
    await passwordLocator.fill("12345678");
    await loginButton.click();

    const wellcomeText = page.locator("h1.display-4");
    await expect(wellcomeText).toHaveText("Welcome to Sales Management Portal");
    const sideBar = page.locator("#sidebar");
    await expect(sideBar).toHaveScreenshot();
  });
});
