import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(protected page: Page) {
    this.emailInput = page.locator("#emailinput");
    this.passwordInput = page.locator("#passwordinput");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async fillCredentails() {
    await this.emailInput.fill("test@gmail.com");
    await this.passwordInput.fill("12345678");
  }

  async loginButtonClick() {
    await this.loginButton.click();
  }
}
