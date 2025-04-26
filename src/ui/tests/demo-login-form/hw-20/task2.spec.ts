// import test, { expect, Page } from "@playwright/test";

// test.describe("[UI] [Demo Shopping Cart] [E2E]", async () => {
//   test("Successfull checkout with 5 products", async ({ page }) => {
//     await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");

//     function getAddToCardButton(productName: string, page: Page) {
//       return page
//         .locator("div.card-body")
//         .filter({
//           has: page.getByText(productName, { exact: true }),
//         })
//         .getByRole("button", { name: "Add to card" });
//     }

//     await getAddToCardButton("Product 2", page).click();
//     await getAddToCardButton("Product 4", page).click();
//     await getAddToCardButton("Product 6", page).click();
//     await getAddToCardButton("Product 8", page).click();

//     const [price1, price3, price5, price8] = await Promise.all([
//       getProductPrice("Product 1", page),
//       getProductPrice("Product 3", page),
//       getProductPrice("Product 5", page),
//     ]);
//   });
// });
