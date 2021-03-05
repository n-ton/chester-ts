import { isUndefined } from 'lodash'
import { FactoryProvider } from '../../uidriver/factory-provider'
import ReporterFactory from '../../reporting/reporter-factory'
import UrlUtils from '../../utils/url-utils'
import AbstractContainer from './abstract-container'

export abstract class AbstractPage extends AbstractContainer {
  private title: string

  constructor(url: string, title: string) {
    super(undefined, url, undefined, undefined, undefined)
    this.title = title
    this.reporter = ReporterFactory.getReporter(AbstractPage.name)
  }

  async goToUrl(url?: string): Promise<void> {
    if (isUndefined(url)) {
      if (UrlUtils.isHttp(this.getUrl())) {
        url = this.getUrl()
      } else {
        throw new Error('Invalid URL: ' + this.getUrl())
      }
    } else {
      if (!UrlUtils.isHttp(url)) {
        throw new Error('Invalid URL: ' + url)
      }
    }

    if (isUndefined(url))
      throw new Error('URL is undefined for Page: ' + this.getLoggableName())

    await FactoryProvider.getWebDriverFactory().getPageDriver().goToUrl(url)
  }

  async refresh() {
    await FactoryProvider.getWebDriverFactory().getPageDriver().refresh()
  }

  async getTitle(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getPageDriver()
      .getTitle()
  }

  async waitUntilTitleIs(timeout?: number): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilTitleIs(this.title, timeout)
  }

  async waitUntilUrlContains(url?: string, timeout?: number): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilUrlContains(
        isUndefined(url)
          ? isUndefined(this.url)
            ? 'undefined'
            : this.url
          : url,
        timeout
      )
  }

  async waitUntilUrlIs(url?: string, timeout?: number): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilUrlIs(
        isUndefined(url)
          ? isUndefined(this.url)
            ? 'undefined'
            : this.url
          : url,
        timeout
      )
  }

  async waitUntilTitleMatches(
    title: RegExp,
    timeout?: number
  ): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilTitleMatches(title, timeout)
  }

  async getCurrentUrl(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getPageDriver()
      .getCurrentUrl()
  }
}
