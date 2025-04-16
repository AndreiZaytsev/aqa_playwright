import test, { expect } from "@playwright/test";

test.describe("[UI] [demo-login-form] Registration", () => {
  const validCredentials = {
    username: "ValidUser",
    password: "Password123!",
  };

  const validCredentialsForNegativeTests = {
    username: "ValidUser2",
    password: "Password123!2",
  };

  const validCredentialsMinLength = {
    username: "Usr",
    password: "Passw0rd",
  };

  const validCredentialsMaxLength = {
    username: "ThisIsAValidUsernameWith40Characters",
    password: "ThisIsAValidPasswordWith20CharacteR1",
  };

  const invalidCredentials = {
    shortUsername: "Us",
    longUsername: "ThisIsAnInvalidUsernameWithMoreThan40Characters",
    shortPassword: "Passw0",
    longPassword: "ThisIsAnInvalidPasswordWithMoreThan20Characters",
    noUppercasePassword: "password123",
    noLowercasePassword: "PASSWORD123",
    onlySpacesPassword: "     ",
  };

  const errorMessageLocator = "#errorMessageOnRegister";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test.describe("Positive Cases", () => {
    test("Should register with valid credentials", async ({ page }) => {
      await page.locator("#userNameOnRegister").fill(validCredentials.username);
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Successfully registered!");
    });

    test("Should register with valid MIN length credentials", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsMinLength.username);
      await page
        .locator("#passwordOnRegister")
        .fill(validCredentialsMinLength.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Successfully registered!");
    });

    test("Should register with valid MAX length credentials", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsMaxLength.username);
      await page
        .locator("#passwordOnRegister")
        .fill(validCredentialsMaxLength.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Successfully registered!");
    });
  });

  test.describe("Negative Cases", () => {
    test("Should not register with empty Username", async ({ page }) => {
      await page
        .locator("#passwordOnRegister")
        .fill(validCredentialsMaxLength.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Username is required");
    });

    test("Should not register with empty Password", async ({ page }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsMaxLength.username);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Password is required");
    });

    test("Should not register with valid Username containing only spaces", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(invalidCredentials.onlySpacesPassword);
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Prefix and postfix spaces are not allowed"
      );
    });

    test("Should not register with valid Username containing prefix space", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(" " + validCredentialsForNegativeTests.username);
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Prefix and postfix spaces are not allowed"
      );
    });

    test("Should not register with valid Username containing postfix space", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username + " ");
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Prefix and postfix spaces are not allowed"
      );
    });

    test("Should not register with valid Username shorter than the minimum length", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(invalidCredentials.shortUsername);
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Username should contain at least 3 characters"
      );
    });

    test("Should not register with valid  Username longer than the maximum length", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(invalidCredentials.longUsername);
      await page.locator("#passwordOnRegister").fill(validCredentials.password);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Username must be between 3 and 40 characters"
      );
    });

    test("Should not register with Password shorter than the minimum length", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username);
      await page
        .locator("#passwordOnRegister")
        .fill(invalidCredentials.shortPassword);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Password should contain at least 8 characters"
      );
    });

    test("Should not register with Password longer than the maximum length", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username);
      await page
        .locator("#passwordOnRegister")
        .fill(invalidCredentials.longPassword);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Password must be between 8 and 20 characters"
      );
    });

    test("Should not register with Password without uppercase letter", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username);
      await page
        .locator("#passwordOnRegister")
        .fill(invalidCredentials.noUppercasePassword);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Password should contain at least one character in upper case"
      );
    });

    test("Should not register with Password without lowercase letter", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username);
      await page
        .locator("#passwordOnRegister")
        .fill(invalidCredentials.noLowercasePassword);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText(
        "Password should contain at least one character in lower case"
      );
    });

    test("Should not register with  Password containing only spaces", async ({
      page,
    }) => {
      await page
        .locator("#userNameOnRegister")
        .fill(validCredentialsForNegativeTests.username);
      await page
        .locator("#passwordOnRegister")
        .fill(invalidCredentials.onlySpacesPassword);
      await page.locator("#register").click();

      //assert
      const notification = page.locator(errorMessageLocator);
      await expect(notification).toContainText("Password is required");
    });
  });
});
