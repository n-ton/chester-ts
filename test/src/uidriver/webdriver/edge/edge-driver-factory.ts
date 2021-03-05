import { isUndefined } from 'lodash'
import { WebDriver, Capabilities } from 'selenium-webdriver'
import { WebDriverFactory } from '../wd-factory'
import { ICapsConfig } from '../../../config/driver/i-caps-config'
import SelenoidConfigReader from '../../../config/driver/selenoid/selenoid-config-reader'
import ReporterFactory from '../../../reporting/reporter-factory'
import { EdgeDriverCreator } from './edge-driver-creator'
import { EdgeCapabilitiesProvider } from './edge-capabilities-provider'
import { EdgeOptionsProvider } from './edge-options-provider'

export class EdgeDriverFactory extends WebDriverFactory {
  constructor() {
    super()
    this.reporter = ReporterFactory.getReporter(EdgeDriverFactory.name)
  }

  createDriver(browserConfig: ICapsConfig): WebDriver {
    let selenoidCapabilities: Capabilities = new Capabilities()
    if (!isUndefined(this.selenoidConfig)) {
      selenoidCapabilities = new SelenoidConfigReader().readData(
        this.selenoidConfig
      )
    }

    const capabilities: Capabilities = new EdgeCapabilitiesProvider()
      .getCapabilities(browserConfig)
      .merge(new EdgeOptionsProvider().getOptions(browserConfig))
      .merge(selenoidCapabilities)

    return new EdgeDriverCreator().createDriver(capabilities)
  }
}
