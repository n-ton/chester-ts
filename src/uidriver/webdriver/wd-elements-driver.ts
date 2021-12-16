import { By, WebDriver, WebElement } from 'selenium-webdriver'
import AbstractElementsContainer from '../../html/containers/abstract-elements.container'
import IReporter from '../../reporting/i-reporter'
import ReporterFactory from '../../reporting/reporter-factory'
import { IElementsDriver } from '../interfaces/i-elements-driver'
import { WdFactoryProvider } from './wd-factory-provider'

export default class WdElementsDriver implements IElementsDriver {
  private reporter: IReporter = ReporterFactory.getReporter(
    WdElementsDriver.name
  )

  async findElements(
    element: AbstractElementsContainer
  ): Promise<WebElement[]> {
    const driver: WebDriver = await WdFactoryProvider.webDriverFactory().getDriver()

    this.reporter.info(`Searching for elements '${element.getLoggableName()}'`)

    return await this.webElementPromiseCallback(
      element,
      driver.findElements(By.xpath(element.getLocatorWithContextLookup()))
    )
  }

  private webElementPromiseCallback(
    element: AbstractElementsContainer,
    promise: Promise<WebElement[]>
  ): Promise<WebElement[]> {
    promise
      .then(() => {
        this.reporter.info(`OK: Found elements '${element.getLoggableName()}'`)
      })
      .catch((e) => {
        this.reporter.warn(`Elements '${element.getLoggableName()}' not found`)
        this.reporter.warn(e.message)
      })
    return promise
  }
}
