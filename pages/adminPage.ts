import { test, expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdminPage extends BasePage {
  private readonly pageHeader: Locator;
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('[data-testid="login-header"]');
    this.usernameField = page.locator('[data-testid="username"]');
    this.passwordField = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="submit"]');
  }

  async goto() {
    await test.step("Go to Admin Page", async () => {
      await this.page.goto("/#/admin");
      await expect(this.pageHeader, "Admin page loaded").toBeVisible();
    });
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
