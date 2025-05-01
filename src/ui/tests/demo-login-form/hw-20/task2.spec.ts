import test, { expect, Locator, Page } from "@playwright/test";
const products = [2, 4, 6, 8, 10];
const URL = "https://anatoly-karpovich.github.io/demo-shopping-cart/";
const promocodes = {
  CODE5: "5-PERCENT-FOR-UTILS",
  CODE7: "JAVA-FOR-BOOMERS",
  CODE8: "NO-PYTHON",
  CODE10: "HOT-COURSE",
  CODE10SECOND: "10-PERCENT-FOR-REDEEM",
  CODE15: "15-PERCENT-FOR-CSS",
};

test.describe("[UI] [Demo Shopping Cart] [E2E]", async () => {
  test("Successfull checkout with 3 products", async ({ page }) => {
    await page.goto(URL);

    for (let product of products) {
      await getAddToCardButton(`Product ${product}`, page).click();
    }
    await expect(page.locator(".badge")).toHaveText(products.length.toString());

    await page.getByRole("button", { name: "Shopping Cart" }).click();
    await expect(page.locator("[data-product-id]")).toHaveCount(
      products.length
    );
    await expect(page.locator("#amount-of-products-in-cart")).toHaveText(
      products.length.toString()
    );

    await inputPromoCode(page, promocodes.CODE5);
    await inputPromoCode(page, promocodes.CODE7);
    await inputPromoCode(page, promocodes.CODE8);
    await inputPromoCode(page, promocodes.CODE10);
    await inputPromoCode(page, promocodes.CODE10SECOND);
    await inputPromoCode(page, promocodes.CODE15);

    await expect(page.locator("#total-price")).toHaveText(
      "$2542.50 (-$3107.5)"
    );
    await page.getByRole("button", { name: "Continue to checkout" }).click();
    await expect(page.getByText("Thanks for ordering!")).toBeVisible();
    await expect(page.locator(".text-muted")).toHaveText("$2542.50");
  });
});

function getAddToCardButton(product: string, page: Page): Locator {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(`${product}`),
    })
    .getByRole("button", { name: "Add to card" });
}

async function inputPromoCode(page: Page, promocode: string): Promise<void> {
  await page.getByPlaceholder("Promo code").fill(promocode);
  await page.getByRole("button", { name: "Redeem" }).click();
  await expect(
    page.locator("#rebates-container li").getByText(promocode)
  ).toBeVisible();
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .locator("span");
}
