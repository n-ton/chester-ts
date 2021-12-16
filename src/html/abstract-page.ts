import IReporter from '../reporting/i-reporter'
import ReporterFactory from '../reporting/reporter-factory'
import { DriversFactory } from '../uidriver/drivers-factory'
import UrlUtils from '../utils/url-utils'
import IPage from './interfaces/i-page'
import ILoggable from './interfaces/i-loggable'

export abstract class AbstractPage implements ILoggable, IPage {
  protected title: string
  protected url: string
  protected reporter: IReporter = ReporterFactory.getReporter(AbstractPage.name)

  constructor(url: string, title: string) {
    this.url = url
    this.title = title
  }

  getUrl(): string {
    return this.url
  }

  setUrl(url: string): void {
    this.url = url
  }

  getLoggableName(): string {
    return this.title + ' [' + this.url + ']'
  }

  async getCurrentUrl(): Promise<string> {
    return await DriversFactory.pageDriver().getCurrentUrl()
  }

  async goToUrl(url?: string): Promise<void> {
    if (url === undefined) {
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

    if (url === undefined)
      throw new Error('URL is undefined for Page: ' + this.getLoggableName())

    await DriversFactory.pageDriver().goToUrl(url)
  }

  async refresh(): Promise<void> {
    await DriversFactory.pageDriver().refresh()
  }

  async getTitle(): Promise<string> {
    return await DriversFactory.pageDriver().getTitle()
  }

  async waitUntilTitleIs(timeout?: number): Promise<boolean> {
    return await DriversFactory.waitDriver().waitUntilTitleIs(
      this.title,
      timeout
    )
  }

  async waitUntilUrlContains(
    entry: string,
    timeout?: number
  ): Promise<boolean> {
    return await DriversFactory.waitDriver().waitUntilUrlContains(
      entry,
      timeout
    )
  }

  async waitUntilUrlIs(url: string, timeout?: number): Promise<boolean> {
    return await DriversFactory.waitDriver().waitUntilUrlIs(url, timeout)
  }

  async waitUntilTitleMatches(
    title: RegExp,
    timeout?: number
  ): Promise<boolean> {
    return await DriversFactory.waitDriver().waitUntilTitleMatches(
      title,
      timeout
    )
  }
}
