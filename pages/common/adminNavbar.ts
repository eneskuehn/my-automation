import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class AdminNavbar extends BasePage {
  private readonly roomsLink: Locator;
  private readonly reportLink: Locator;
  private readonly brandingLink: Locator;
  private readonly messagesLink: Locator;
  private readonly unreadMessagesNotification: Locator;
  private readonly frontPageLink: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.roomsLink = page.getByRole("link", { name: "Rooms" });
    this.reportLink = page.getByRole("link", { name: "Report" });
    this.brandingLink = page.getByRole("link", { name: "Branding" });
    this.messagesLink = page.locator('[href*="#/admin/messages"]');
    this.unreadMessagesNotification = page.locator(
      'a[href*="#/admin/messages"] .notification'
    );
    this.frontPageLink = page.getByRole("link", { name: "Front Page" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
  }

  async clickOnRooms() {
    await this.roomsLink.click();
  }

  async clickOnReport() {
    await this.reportLink.click();
  }

  async clickOnBranding() {
    await this.brandingLink.click();
  }

  async clickOnMessages() {
    await this.messagesLink.click();
  }

  async getUnreadMessagesCount() {
    return await this.unreadMessagesNotification.textContent();
  }

  async clickOnFrontPage() {
    await this.frontPageLink.click();
  }

  async clickOnLogout() {
    await this.logoutLink.click();
  }
}
