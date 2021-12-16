import { isUndefined } from 'lodash'
import {
  WebElement,
  until,
  Condition,
  By,
  error,
  IWebDriverCookie,
} from 'selenium-webdriver'
import { IWaitDriver } from '../interfaces/i-wait-driver'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import AbstractElementsContainer from '../../html/containers/abstract-elements.container'
import { WdFactoryProvider } from './wd-factory-provider'

export class WdWaitDriver implements IWaitDriver {
  private reporter: IReporter = ReporterFactory.getReporter(WdWaitDriver.name)

  async waitUntilElementIsVisible(
    element: AbstractElementsContainer,
    timeout?: number
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(until.elementIsVisible(webElement), timeout)
  }

  async waitUntilElementIsNotVisible(
    element: AbstractElementsContainer,
    timeout?: number
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(until.elementIsNotVisible(webElement), timeout)
  }

  async waitUntilElementIsStale(
    element: AbstractElementsContainer,
    timeout?: number
  ): Promise<boolean> {
    let webElement: WebElement
    try {
      webElement = await WdFactoryProvider.webDriverFactory()
        .getElementDriver()
        .findElement(element)
    } catch (e) {
      if (e instanceof error.NoSuchElementError) {
        this.reporter.info(e.message)
        return true
      }
      throw new Error(e)
    }
    await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .scrollToElement(element)
    return await this.waitUntil(until.stalenessOf(webElement), timeout)
  }

  async waitUntilElementIsLocated(
    element: AbstractElementsContainer,
    timeout?: number
  ): Promise<boolean | WebElement> {
    return await this.waitUntil(
      until.elementLocated(By.xpath(element.getLocatorWithContextLookup())),
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
    element: AbstractElementsContainer,
    text: string,
    timeout?: number,
    message?: string
  ): Promise<boolean | WebElement> {
    const webElement: WebElement = await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .findElement(element)
    return await this.waitUntil(
      until.elementTextContains(webElement, text),
      timeout,
      message
    )
  }

  async waitUntilElementIsClickable(
    element: AbstractElementsContainer,
    timeout?: number,
    message?: string
  ): Promise<WebElement | boolean> {
    const webElement: WebElement = await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .findElement(element)

    await this.waitUntil(until.elementIsVisible(webElement), timeout, message)
    return await this.waitUntil(
      until.elementIsEnabled(webElement),
      timeout,
      message
    )
  }

  async waitUntilWindowHandlesCount(
    count: number,
    message?: string
  ): Promise<boolean> {
    return await this.waitUntil(
      new Condition(
        `until window handles count is ${count}`,
        async (): Promise<boolean> => {
          await this.sleep(1000)
          return (
            (await WdFactoryProvider.webDriverFactory().getAllWindowHandles())
              .length === count
          )
        }
      ),
      10000,
      message
    )
  }

  private async waitUntil<T>(
    condition: Condition<T>,
    timeout?: number,
    message?: string
  ): Promise<boolean | T> {
    if (isUndefined(timeout)) {
      timeout = (await WdFactoryProvider.webDriverFactory().getWaitingTimeout())
        ?.implicit
    }
    this.reporter.info(
      'Waiting for condition',
      `${condition.description()}`,
      `timeout: ${timeout}ms`
    )

    return await (await WdFactoryProvider.webDriverFactory().getDriver())
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
    await WdFactoryProvider.webDriverFactory().sleep(value)
  }

  async waitUntilCookieExist(
    name: string,
    timeout: number
  ): Promise<IWebDriverCookie | undefined> {
    let start = new Date().getTime()
    let cookie
    do {
      try {
        cookie = await WdFactoryProvider.webDriverFactory()
          .getDriverManager()
          .getCookie(name)
      } catch (error) {
        cookie = undefined
        this.reporter.warn(error.message)
      }
      await this.sleep(1000)
    } while (isUndefined(cookie) && new Date().getTime() - start < timeout)

    return isUndefined(cookie) ? undefined : cookie
  }

  async waitUntilAttributeEquals(
    element: AbstractElementsContainer,
    attr: string,
    value: string,
    timeout: number | undefined
  ): Promise<boolean> {
    return await this.waitUntil(
      new Condition(
        `until element ${element.getLoggableName()} contains attribute ${attr}='${value}'`,
        async (): Promise<boolean> => {
          await this.sleep(1000)
          return (
            (await WdFactoryProvider.webDriverFactory()
              .getElementDriver()
              .getAttributeValue(element, attr)) === value
          )
        }
      ),
      timeout
    )
  }
}
