import { test, expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class LandingPage extends BasePage {
  readonly pageLocator: Locator;
  private readonly bookThisRoomButton: Locator;

  private readonly bookingCalendarStart: Locator;
  private readonly bookingCalendarEnd: Locator;
  private readonly bookingFirstNameField: Locator;
  private readonly bookingLastNameField: Locator;
  private readonly bookingEmailField: Locator;
  private readonly bookingPhoneNumberField: Locator;
  private readonly bookingBookButton: Locator;
  private readonly bookingCalendarNextButton: Locator;
  private readonly bookingConfirmationModal: Locator;

  private readonly contactNameField: Locator;
  private readonly contactEmailField: Locator;
  private readonly contactPhoneField: Locator;
  private readonly contactSubjectField: Locator;
  private readonly contactDescriptionField: Locator;
  private readonly contactSubmitButton: Locator;
  private readonly contactSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageLocator = page.locator(".hotel-description");
    this.bookThisRoomButton = page
      .getByRole("button", { name: "Book this room" })
      .first();

    this.bookingCalendarStart = this.page
      .locator(".rbc-day-bg:not(.rbc-off-range-bg)")
      .first();
    this.bookingCalendarEnd = this.page
      .locator(".rbc-day-bg:not(.rbc-off-range-bg)")
      .last();
    this.bookingFirstNameField = page.locator("input.room-firstname").last();
    this.bookingLastNameField = page.locator("input.room-lastname").last();
    this.bookingEmailField = page.locator("input.room-email").last();
    this.bookingPhoneNumberField = page.locator("input.room-phone").last();
    this.bookingBookButton = page
      .getByRole("button", { name: "Book", exact: true })
      .last();
    this.bookingCalendarNextButton = page
      .getByRole("button", { name: "Next" })
      .last();
    this.bookingConfirmationModal = page.locator(".confirmation-modal");

    this.contactNameField = page.locator('[data-testid="ContactName"]');
    this.contactEmailField = page.locator('[data-testid="ContactEmail"]');
    this.contactPhoneField = page.locator('[data-testid="ContactPhone"]');
    this.contactSubjectField = page.locator('[data-testid="ContactSubject"]');
    this.contactDescriptionField = page.locator('[data-testid="ContactDescription"]');
    this.contactSubmitButton = page.getByRole("button", { name: "Submit" });
    this.contactSuccessMessage = page.locator("div.contact h2");
  }

  async goto() {
    await test.step("Go to Front Page", async () => {
      await this.page.goto("/");
      await expect(this.pageLocator, "Front Page loaded").toBeVisible();
    });
  }

  async sendMessage(
    name: string,
    email: string,
    phone: string,
    subject: string,
    description: string
  ) {
    await test.step("Submit Message to Hotel", async () => {
      await this.contactNameField.fill(name);
      await this.contactEmailField.fill(email);
      await this.contactPhoneField.fill(phone);
      await this.contactSubjectField.fill(subject);
      await this.contactDescriptionField.fill(description);
      await this.contactSubmitButton.click();
    });
  }

  async bookFirstAvailableRoom(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
  ) {
    await this.bookThisRoomButton.click();

    await this.bookingFirstNameField.fill(firstName);
    await this.bookingLastNameField.fill(lastName);
    await this.bookingEmailField.fill(email);
    await this.bookingPhoneNumberField.fill(phoneNumber);

    const randomClicks = faker.number.int({ min: 5, max: 15 });
    for (let i = 0; i < randomClicks; i++) {
      await this.bookingCalendarNextButton.click();
    }
    await this.bookingCalendarStart.hover();
    await this.page.mouse.down();
    await this.bookingCalendarEnd.hover();
    await this.page.mouse.up();

    await this.bookingBookButton.click();
  }

  async getContactSuccessMessage() {
    return (await this.contactSuccessMessage.innerText()).toString();
  }

  async getBookingConfirmationMessage() {
    return (await this.bookingConfirmationModal.innerText()).toString();
  }
}
