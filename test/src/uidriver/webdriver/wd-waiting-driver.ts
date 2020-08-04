import { WebElement, until, Condition, By, error } from 'selenium-webdriver'
import { FactoryProvider } from '../factory-provider'
import { IWaitingDriver } from '../interfaces/i-waiting-driver'
import { baseConfig } from '../../config/base-config'

export class WdWaitingDriver implements IWaitingDriver {
  async waitUntilElementIsVisible(element: ILocatable, timeout?: number) {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)
    await this.waitUntil(until.elementIsVisible(webElement), timeout)
  }

  async waitUntilElementIsLocated(element: ILocatable, timeout?: number) {
    let locator: any = element.getLocator()
    if (locator !== undefined) {
      await this.waitUntil(until.elementLocated(By.xpath(locator)), timeout)
    } else {
      console.warn(`Locator is not defined for '${locator}'`)
    }
  }

  async waitUntilTitleIs(title: string, timeout?: number, message?: string) {
    await this.waitUntil(until.titleIs(title), timeout, message)
  }

  async waitUntilElementIsClickable(
    element: ILocatable,
    timeout?: number,
    message?: string
  ) {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)

    await this.waitUntil(until.elementIsVisible(webElement), timeout, message)
    await this.waitUntil(until.elementIsEnabled(webElement), timeout, message)
  }

  private async waitUntil<T>(
    condition: Condition<T>,
    timeout?: number,
    message?: string
  ): Promise<void> {
    if (timeout == null || timeout === undefined) {
      timeout = baseConfig.waitUntilCondition
    }

    const msg: string = `Waiting for condition "${condition.description()}" with timeout ${timeout}ms`
    console.log(msg)

    try {
      await FactoryProvider.getWebDriverFactory()
        .getDriver()
        .wait(condition, timeout, message)
      console.info(
        `OK: Condition '${condition.description()}' wait reached in ${timeout}ms`
      )
    } catch (e) {
      console.warn(
        `WARN: Condition '${condition.description()}' wait timed out after ${timeout}ms`
      )
      console.error(e.message)
      if (e instanceof error.TimeoutError) {
        throw e
      }
    }
  }
}
