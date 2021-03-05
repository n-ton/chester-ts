import { error } from 'selenium-webdriver'
import { IPageDriver } from '../interfaces/i-page-driver'
import { FactoryProvider } from '../factory-provider'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'

export class WdPageDriver implements IPageDriver {
  private reporter: IReporter = ReporterFactory.getReporter(WdPageDriver.name)

  async goToUrl(url: string) {
    this.reporter.info('Opening URL', `${url}`)
    try {
      await (await FactoryProvider.getWebDriverFactory().getDriver()).get(url)
    } catch (e) {
      if (e instanceof error.InvalidArgumentError) {
        throw new Error(`Trying to open invalid URL: ${url}\n` + e.message)
      }
    }
  }

  async maximizeWindow() {
    this.reporter.info('Maximizing window.')
    await (await FactoryProvider.getWebDriverFactory().getDriver())
      .manage()
      .window()
      .maximize()
  }

  async refresh() {
    this.reporter.info('Refreshing page.')
    await (await FactoryProvider.getWebDriverFactory().getDriver())
      .navigate()
      .refresh()
  }

  async navigateTo(url: string) {
    this.reporter.info('Navigating to a new URL', `${url}`)
    await (await FactoryProvider.getWebDriverFactory().getDriver())
      .navigate()
      .to(url)
  }

  async getTitle(): Promise<string> {
    this.reporter.info('Getting title.')
    return await (
      await FactoryProvider.getWebDriverFactory().getDriver()
    ).getTitle()
  }

  async takePageScreenshot(): Promise<string> {
    this.reporter.info('Taking page screenshot.')
    return await (
      await FactoryProvider.getWebDriverFactory().getDriver()
    ).takeScreenshot()
  }

  async getCurrentUrl(): Promise<string> {
    this.reporter.info('Getting current URL.')
    const url: string = await (
      await FactoryProvider.getWebDriverFactory().getDriver()
    ).getCurrentUrl()
    this.reporter.info('Current URL', url)

    return url
  }
}
