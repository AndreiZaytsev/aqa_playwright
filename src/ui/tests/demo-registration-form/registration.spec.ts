import test, { expect } from "@playwright/test";
test.describe("[UI] [demo-registration-form] Registration", () => {
  test.only("Fill registration form with valid values", async ({ page }) => {
    const validUser = {
      firstName: "Ivan",
      lastName: "Petrov",
      address: "Puskina st. Kolotushkina house",
      email: "aqa@aqa.com",
      phone: "155577111",
      language: "TypeScript speaker",
      password: "123!123!",
      country: "USA",
      gender: "male",
      skills: "JavaScript",
      hobbies: "Gaming",
      dateOfBirth: "20 October 1987",
    };
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );

    //Full Name, Address, Email address, Phone
    await page.locator("#firstName").fill(validUser.firstName);
    await page.locator("#lastName").fill(validUser.lastName);
    await page.locator("#address").fill(validUser.address);
    await page.locator("#email").fill(validUser.email);
    await page.locator("#phone").fill(validUser.phone);

    //Country
    const countryDropdown = page.locator("#country");
    await countryDropdown.selectOption("USA");

    //Gender
    await page.locator('input[value="male"]').click();

    //Hobbies
    await page.locator('.hobby[value="Gaming"]').click();

    //Language
    await page.locator("#language").fill(validUser.language);

    //Dkills
    const skillsDropdown = page.locator("#skills");
    await skillsDropdown.selectOption("JavaScript");

    //Date of Birth
    const yearOfBirth = page.locator("#year");
    await yearOfBirth.selectOption("1987");

    const monthOfBirth = page.locator("#month");
    await monthOfBirth.selectOption("October");

    const dayOfBirth = page.locator("#day");
    await dayOfBirth.selectOption("20");

    await page.locator("#password").fill(validUser.password);
    await page.locator("#password-confirm").fill(validUser.password);

    //Submit
    await page.locator('button[type="submit"]').click();

    //Проверяем появление формы с результатами после клика
    await expect(page.locator("h2")).toHaveText("Registration Details");

    //assert

    await expect(page.locator("#fullName")).toHaveText(
      `${validUser.firstName} ${validUser.lastName}`
    );
    await expect(page.locator("#address")).toHaveText(`${validUser.address}`);
    await expect(page.locator("#email")).toHaveText(`${validUser.email}`);
    await expect(page.locator("#phone")).toHaveText(`${validUser.phone}`);
    await expect(page.locator("#phone")).toHaveText(`${validUser.phone}`);
    await expect(page.locator("#country")).toHaveText(`${validUser.country}`);
    await expect(page.locator("#gender")).toHaveText(`${validUser.gender}`);
    await expect(page.locator("#language")).toHaveText(`${validUser.language}`);
    await expect(page.locator("#skills")).toHaveText(`${validUser.skills}`);
    await expect(page.locator("#hobbies")).toHaveText(`${validUser.hobbies}`);
    await expect(page.locator("#dateOfBirth")).toHaveText(
      `${validUser.dateOfBirth}`
    );

    //проверка длинны пароля
    const passwordDisplay = await page.locator("#password").textContent();
    if (passwordDisplay === null) {
      throw new Error("Password display content is null");
    }
    //проверка заполненостью *
    await expect(passwordDisplay.length).toBe(validUser.password.length);
    //проверка что только *
    await expect(passwordDisplay).toBe("*".repeat(validUser.password.length));

    //проверка storage (логин и пароль)
    //делается через page.evaluate(): Этот метод выполняет JavaScript-код в контексте браузера, где доступен объект window и, соответственно, localStorage.
    const storageData = await page.evaluate(() => {
      const formData = localStorage.getItem("formData");
      return formData ? JSON.parse(formData) : null;
    });
    await expect(storageData.password).toBe(validUser.password);
  });
});
