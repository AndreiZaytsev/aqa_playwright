import { Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  newUserEmailField: Locator;
  newUserNameField: Locator;
  newUserCountryField: Locator;

  constructor(protected page: Page) {
    super(page);
    this.newUserEmailField = page.locator("//tbody/tr[1]/td[1]");
    this.newUserNameField = page.locator("//tbody/tr[1]/td[2]");
    this.newUserCountryField = page.locator("//tbody/tr[1]/td[3]");
  }

  addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });

  uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }
}
