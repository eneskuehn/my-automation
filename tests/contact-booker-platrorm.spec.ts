import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { faker } from "@faker-js/faker";

let landingPage: LandingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto();
});

test("Contact the platform by populating all the mandodtory fields in the contact form.", async () => {
  const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number();
  const subject = faker.lorem.sentence(3);
  const message = faker.lorem.lines(5);
  await landingPage.sendMessage(name, email, phoneNumber, subject, message);

  const successMessage = `Thanks for getting in touch ${name}`;
  const contactSuccessMessage = await landingPage.getContactSuccessMessage();
  expect(contactSuccessMessage).toContain(successMessage);
});
