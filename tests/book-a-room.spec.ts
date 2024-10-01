import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { faker } from "@faker-js/faker";

let landingPage: LandingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto();
});

test("Book a room by filling up all mandatory fields", async () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number();

  await landingPage.bookFirstAvailableRoom(
    firstName,
    lastName,
    email,
    phoneNumber
  );
  const bookingSuccessMessage = "Booking Successful!";
  const bookingConfirmedMessage =
    "Congratulations! Your booking has been confirmed";
  expect(await landingPage.getBookingConfirmationMessage()).toContain(
    bookingSuccessMessage
  );
  expect(await landingPage.getBookingConfirmationMessage()).toContain(
    bookingConfirmedMessage
  );
});
