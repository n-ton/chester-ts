import { error } from 'selenium-webdriver'
import { IPageDriver } from '../interfaces/i-page-driver'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import { WdFactoryProvider } from './wd-factory-provider'

export class WdPageDriver implements IPageDriver {
  private reporter: IReporter = ReporterFactory.getReporter(WdPageDriver.name)

  async goToUrl(url: string) {
    this.reporter.info('Opening URL', `${url}`)
    try {
      await (await WdFactoryProvider.webDriverFactory().getDriver()).get(url)
    } catch (e) {
      if (e instanceof error.InvalidArgumentError) {
        throw new Error(`Trying to open invalid URL: ${url}\n` + e.message)
      }
    }
  }

  async maximizeWindow() {
    this.reporter.info('Maximizing window.')
    await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .window()
      .maximize()
  }

  async refresh() {
    this.reporter.info('Refreshing page.')
    await (await WdFactoryProvider.webDriverFactory().getDriver())
      .navigate()
      .refresh()
  }

  async navigateTo(url: string) {
    this.reporter.info('Navigating to a new URL', `${url}`)
    await (await WdFactoryProvider.webDriverFactory().getDriver())
      .navigate()
      .to(url)
  }

  async getTitle(): Promise<string> {
    this.reporter.info('Getting title.')
    return await (
      await WdFactoryProvider.webDriverFactory().getDriver()
    ).getTitle()
  }

  async takePageScreenshot(): Promise<string> {
    this.reporter.info('Taking page screenshot.')
    return await (
      await WdFactoryProvider.webDriverFactory().getDriver()
    ).takeScreenshot()
  }

  async getCurrentUrl(): Promise<string> {
    this.reporter.info('Getting current URL.')
    const url: string = await (
      await WdFactoryProvider.webDriverFactory().getDriver()
    ).getCurrentUrl()
    this.reporter.info('Current URL', url)

    return url
  }
}
