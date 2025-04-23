import test, { expect } from "@playwright/test";

test.describe("[UI] [demo-login-form] Registration", () => {
  interface IRegistrationTestData {
    testName: string;
    username: string;
    password: string;
    message: string;
  }

  const registrationValidTestData: IRegistrationTestData[] = [
    {
      testName: "Successfully registered with max valid data",
      username: "aB!11111111111111111111",
      password: "123AAbb!111111111111",
      message:
        "Successfully registered! Please, click Back to return on login page",
    },
    {
      testName: "Successfully registered with min valid data",
      username: "aB!",
      password: "123AAbb!",
      message:
        "Successfully registered! Please, click Back to return on login page",
    },
  ];

  const registrationInvalidTestData = [
    {
      testName: "Should not register with more than 40 characters in username",
      username: "ThisIsAnInvalidUsernameWithMoreThan40Characters",
      password: "Password123!",
      message: "Username must be between 3 and 40 characters",
    },
    {
      testName: "Should not register with empty Username",
      username: "",
      password: "Password123!",
      message: "Username is required",
    },
    {
      testName: "Should not register with empty Password",
      username: "ValidUser",
      password: "",
      message: "Password is required",
    },
    {
      testName:
        "Should not register with valid Username containing only spaces",
      username: "   ",
      password: "Password123!",
      message: "Prefix and postfix spaces are not allowed",
    },
    {
      testName:
        "Should not register with valid Username containing prefix space",
      username: " ValidUser",
      password: "Password123!",
      message: "Prefix and postfix spaces are not allowed",
    },
    {
      testName:
        "Should not register with valid Username containing postfix space",
      username: "ValidUser ",
      password: "Password123!",
      message: "Prefix and postfix spaces are not allowed",
    },
    {
      testName:
        "Should not register with valid Username shorter than the minimum length",
      username: "Us",
      password: "Password123!",
      message: "Username should contain at least 3 characters",
    },
    {
      testName:
        "Should not register with Password shorter than the minimum length",
      username: "ValidUser",
      password: "Passw0",
      message: "Password should contain at least 8 characters",
    },
    {
      testName:
        "Should not register with Password longer than the maximum length",
      username: "ValidUser",
      password: "ThisIsAnInvalidPasswordWithMoreThan20Characters",
      message: "Password must be between 8 and 20 characters",
    },
    {
      testName: "Should not register with Password without uppercase letter",
      username: "ValidUser",
      password: "password123",
      message: "Password should contain at least one character in upper case",
    },
    {
      testName: "Should not register with Password without lowercase letter",
      username: "ValidUser",
      password: "PASSWORD123",
      message: "Password should contain at least one character in lower case",
    },
    {
      testName: "Should not register with  Password containing only spaces",
      username: "ValidUser",
      password: "     ",
      message: "Password is required",
    },
  ];

  const errorMessageLocator = "#errorMessageOnRegister";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test.describe("Positive Cases", () => {
    registrationValidTestData.forEach(
      ({ testName, username, password, message }) => {
        test.only(testName, async ({ page }) => {
          await page.goto(
            "https://anatoly-karpovich.github.io/demo-login-form/"
          );
          await page.locator("#registerOnLogin").click();
          const form = page.locator(".registerForm");
          await form.locator("#userNameOnRegister").fill(username);
          await form.locator("#passwordOnRegister").fill(password);
          await form.locator("#register").click();
          await expect(form.locator("#errorMessageOnRegister")).toHaveText(
            message
          );
          const localStorageData = await page.evaluate((username: string) => {
            return window.localStorage.getItem(username);
          }, username);
          expect(localStorageData).toBeTruthy();
          const user = JSON.parse(localStorageData!);
          expect(user).toMatchObject({
            name: username,
            password,
          });
        });
      }
    );
  });

  test.describe("Negative Cases", () => {
    registrationInvalidTestData.forEach(
      ({ testName, username, password, message }) => {
        test.only(testName, async ({ page }) => {
          await page.goto(
            "https://anatoly-karpovich.github.io/demo-login-form/"
          );
          await page.locator("#registerOnLogin").click();
          const form = page.locator(".registerForm");
          await form.locator("#userNameOnRegister").fill(username);
          await form.locator("#passwordOnRegister").fill(password);
          await form.locator("#register").click();
          await expect(form.locator("#errorMessageOnRegister")).toHaveText(
            message
          );
        });
      }
    );
  });
});
