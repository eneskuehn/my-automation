import { Locator, Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locator(selector: string): Locator {
    const originalLocator = this.page.locator(selector);

    return new Proxy(originalLocator, {
      get: (target, prop: PropertyKey) => {
        const value = (target as any)[prop];
        if (typeof value === "function") {
          return async (...args: any[]) => {
            logger.info(
              `Calling method ${String(
                prop
              )} on locator: ${selector} with arguments: ${JSON.stringify(
                args
              )}`
            );
            const result = await value.call(target, ...args);
            logger.info(
              `Method ${String(
                prop
              )} on locator: ${selector} completed with result: ${result}`
            );
            return result;
          };
        }
        return value;
      },
    });
  }

  getByRole(role: string, options?: any): Locator {
    const originalLocator = this.page.getByRole(role as any, options);
    const selectorDescription = `role = ${role}${
      options ? ` with options ${JSON.stringify(options)}` : ""
    }`;

    return new Proxy(originalLocator, {
      get: (target, prop: PropertyKey) => {
        const value = (target as any)[prop];
        if (typeof value === "function") {
          return async (...args: any[]) => {
            if (args.length > 0) {
              logger.info(`Arguments: ${JSON.stringify(args)}`);
            }
            const result = await value.call(target, ...args);
            logger.info(
              `Method ${String(prop)} for role: ${selectorDescription} executed`
            );
            if (result != undefined) {
              logger.info(`Result: ${result}`);
            }
            return result;
          };
        }
        return value;
      },
    });
  }

  getByText(text: string, options?: any): Locator {
    const originalLocator = this.page.getByText(text, options);
    const selectorDescription = `text=${text}${
      options ? ` with options ${JSON.stringify(options)}` : ""
    }`;

    return new Proxy(originalLocator, {
      get: (target, prop: PropertyKey) => {
        const value = (target as any)[prop];
        if (typeof value === "function") {
          return async (...args: any[]) => {
            logger.info(
              `Calling method ${String(
                prop
              )} for text: ${selectorDescription} with arguments: ${JSON.stringify(
                args
              )}`
            );
            const result = await value.call(target, ...args);
            logger.info(
              `Method ${String(
                prop
              )} for text: ${selectorDescription} completed with result: ${result}`
            );
            return result;
          };
        }
        return value;
      },
    });
  }
}
