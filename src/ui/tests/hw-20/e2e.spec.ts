import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { CustomersPage } from "../../pages/customers/customers.page";
import { AddNewCustomerPage } from "../../pages/customers/add-new-customer.page";
import { LoginPage } from "../../pages/login.page";
import { generateCustomerData } from "../../../data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "../../../data/notifications.data";

test.describe("[UI] [Sales Portal] [Customers]", () => {
  test.only("Should create customer", async ({ page }) => {
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    const loginPage = new LoginPage(page);

    // Login
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await loginPage.fillCredentails();
    await loginPage.loginButtonClick();

    // Create new user
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    // Assertion
    await expect(customersPage.newUserEmailField).toHaveText(data.email);
    await expect(customersPage.newUserNameField).toHaveText(data.name);
    await expect(customersPage.newUserCountryField).toHaveText(data.country);
  });
});
