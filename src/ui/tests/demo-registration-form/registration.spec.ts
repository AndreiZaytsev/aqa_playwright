// import test, { expect } from "@playwright/test";
// test.describe("[UI] [demo-registration-form] Registration", () => {
//   test.only("Fill registration form with valid values", async ({ page }) => {
//     const validUser = {
//       firstName: "Ivan",
//       lastName: "Petrov",
//       address: "Puskina st. Kolotushkina house",
//       email: "aqa@aqa.com",
//       phone: "155577111",
//       language: "TypeScript speaker",
//       password: "123!123!",
//       country: "USA",
//       gender: "male",
//       skills: "JavaScript",
//       hobbies: "Gaming",
//       dateOfBirth: "20 October 1987",
//     };
//     await page.goto(
//       "https://anatoly-karpovich.github.io/demo-registration-form/"
//     );

//     //Full Name, Address, Email address, Phone
//     await page.locator("#firstName").fill(validUser.firstName);
//     await page.locator("#lastName").fill(validUser.lastName);
//     await page.locator("#address").fill(validUser.address);
//     await page.locator("#email").fill(validUser.email);
//     await page.locator("#phone").fill(validUser.phone);

//     //Country
//     const countryDropdown = page.locator("#country");
//     await countryDropdown.selectOption("USA");

//     //Gender
//     await page.locator('input[value="male"]').click();

//     //Hobbies
//     await page.locator('.hobby[value="Gaming"]').click();

//     //Language
//     await page.locator("#language").fill(validUser.language);

//     //Dkills
//     const skillsDropdown = page.locator("#skills");
//     await skillsDropdown.selectOption("JavaScript");

//     //Date of Birth
//     const yearOfBirth = page.locator("#year");
//     await yearOfBirth.selectOption("1987");

//     const monthOfBirth = page.locator("#month");
//     await monthOfBirth.selectOption("October");

//     const dayOfBirth = page.locator("#day");
//     await dayOfBirth.selectOption("20");

//     await page.locator("#password").fill(validUser.password);
//     await page.locator("#password-confirm").fill(validUser.password);

//     //Submit
//     await page.locator('button[type="submit"]').click();

//     //assert

//     await expect(page.locator("#fullName")).toContainText(
//       `${validUser.firstName} ${validUser.lastName}`
//     );
//     await expect(page.locator("#address")).toContainText(
//       `${validUser.address}`
//     );
//     await expect(page.locator("#email")).toContainText(`${validUser.email}`);
//     await expect(page.locator("#phone")).toContainText(`${validUser.phone}`);
//     await expect(page.locator("#phone")).toContainText(`${validUser.phone}`);
//     await expect(page.locator("#country")).toContainText(
//       `${validUser.country}`
//     );
//     await expect(page.locator("#gender")).toContainText(`${validUser.gender}`);
//     await expect(page.locator("#language")).toContainText(
//       `${validUser.language}`
//     );
//     await expect(page.locator("#skills")).toContainText(`${validUser.skills}`);
//     await expect(page.locator("#hobbies")).toContainText(
//       `${validUser.hobbies}`
//     );
//     await expect(page.locator("#dateOfBirth")).toContainText(
//       `${validUser.dateOfBirth}`
//     );
//     await expect(page.locator("#password")).toContainText(`*****`);
//   });
// });
