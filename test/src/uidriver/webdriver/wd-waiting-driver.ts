import { isUndefined } from 'lodash'
import {
  WebElement,
  until,
  Condition,
  By,
  error,
  IWebDriverCookie,
} from 'selenium-webdriver'
import { FactoryProvider } from '../factory-provider'
import { IWaitingDriver } from '../interfaces/i-waiting-driver'
import { ILocatable } from '../../interfaces/i-locatable'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import { WdManager } from './wd-manager'

export class WdWaitingDriver implements IWaitingDriver {
  private reporter: IReporter = ReporterFactory.getReporter(
    WdWaitingDriver.name
  )

  async waitUntilElementIsVisible(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(until.elementIsVisible(webElement), timeout)
  }

  async waitUntilElementIsNotVisible(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(until.elementIsNotVisible(webElement), timeout)
  }

  async waitUntilElementIsStale(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean> {
    let webElement: WebElement
    try {
      webElement = await FactoryProvider.getWebDriverFactory()
        .getElementDriver()
        .findElement(element)
    } catch (e) {
      if (e instanceof error.NoSuchElementError) {
        this.reporter.info(e.message)
        return true
      }
      throw new Error(e)
    }
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .scrollToElement(element)
    return await this.waitUntil(until.stalenessOf(webElement), timeout)
  }

  async waitUntilElementIsLocated(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement> {
    return await this.waitUntil(
      until.elementLocated(By.xpath(element.getFullLocator())),
      timeout
    )
  }

  async waitUntilUrlContains(
    url: string,
    timeout?: number,
    message?: string
  ): Promise<boolean> {
    return await this.waitUntil(until.urlContains(url), timeout, message)
  }

  async waitUntilUrlIs(
    url: string,
    timeout?: number,
    message?: string
  ): Promise<boolean> {
    return await this.waitUntil(until.urlIs(url), timeout, message)
  }

  async waitUntilTitleIs(
    title: string,
    timeout?: number,
    message?: string
  ): Promise<boolean> {
    return await this.waitUntil(until.titleIs(title), timeout, message)
  }

  async waitUntilTitleMatches(
    title: RegExp,
    timeout?: number,
    message?: string
  ): Promise<boolean> {
    return await this.waitUntil(until.titleMatches(title), timeout, message)
  }

  async waitUntilElementTextContains(
    element: ILocatable,
    text: string,
    timeout?: number,
    message?: string
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(
      until.elementTextContains(webElement, text),
      timeout,
      message
    )
  }

  async waitUntilElementIsClickable(
    element: ILocatable,
    timeout?: number,
    message?: string
  ): Promise<WebElement | boolean> {
    const webElement: WebElement = await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .findElement(element)

    await this.waitUntil(until.elementIsVisible(webElement), timeout, message)
    return await this.waitUntil(
      until.elementIsEnabled(webElement),
      timeout,
      message
    )
  }

  private async waitUntil<T>(
    condition: Condition<T>,
    timeout?: number,
    message?: string
  ): Promise<boolean | T> {
    if (isUndefined(timeout)) {
      timeout = (
        await FactoryProvider.getWebDriverFactory().getWaitingTimeout()
      )?.implicit
    }
    this.reporter.info(
      'Waiting for condition',
      `${condition.description()}`,
      `timeout: ${timeout}ms`
    )

    return await (await FactoryProvider.getWebDriverFactory().getDriver())
      .wait(condition, timeout, message)
      .then((result) => {
        this.reporter.info(
          'Condition wait reached',
          `${condition.description()}`,
          `timeout: ${timeout}ms`
        )
        return result
      })
      .catch((e) => {
        const msg: string = 'Condition wait timed out'
        const params: string[] = [
          `${e.name}: ${e.message}`,
          `timeout: ${timeout}ms`,
        ]
        this.reporter.warn(msg, params)
        return false
      })
  }

  private async sleep(value: number): Promise<void> {
    await (await FactoryProvider.getWebDriverFactory().getDriver()).sleep(value)
  }

  async waitUntilCookieExist(
    name: string,
    timeout: number
  ): Promise<IWebDriverCookie | undefined> {
    let start = new Date().getTime()
    let cookie
    do {
      try {
        cookie = await WdManager.getCookie(name)
      } catch (error) {
        cookie = undefined
        this.reporter.warn(error.message)
      }
      await this.sleep(1000)
    } while (isUndefined(cookie) && new Date().getTime() - start < timeout)

    return isUndefined(cookie) ? undefined : cookie
  }
}
