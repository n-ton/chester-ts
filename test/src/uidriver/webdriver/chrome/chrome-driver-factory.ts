import { isUndefined } from 'lodash'
import { WebDriver, Capabilities } from 'selenium-webdriver'
import { WebDriverFactory } from '../wd-factory'
import { ICapsConfig } from '../../../config/driver/i-caps-config'
import SelenoidConfigReader from '../../../config/driver/selenoid/selenoid-config-reader'
import ReporterFactory from '../../../reporting/reporter-factory'
import { ChromeDriverCreator } from './chrome-driver-creator'
import ChromeCapabilitiesProvider from './chrome-capabilities-provider'
import ChromeOptionsProvider from './chrome-options-provider'

export class ChromeDriverFactory extends WebDriverFactory {
  constructor() {
    super()
    this.reporter = ReporterFactory.getReporter(ChromeDriverFactory.name)
  }

  createDriver(capsConfig: ICapsConfig): WebDriver {
    let selenoidCapabilities: Capabilities = new Capabilities()
    if (!isUndefined(this.selenoidConfig)) {
      selenoidCapabilities = new SelenoidConfigReader().readData(
        this.selenoidConfig
      )
    }

    const capabilities: Capabilities = new ChromeCapabilitiesProvider()
      .getCapabilities(capsConfig)
      .merge(new ChromeOptionsProvider().getOptions(capsConfig))
      .merge(selenoidCapabilities)

    return new ChromeDriverCreator().createDriver(capabilities)
  }
}
