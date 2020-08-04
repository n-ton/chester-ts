import { isUndefined } from 'util'
import { WebDriver, Capabilities } from 'selenium-webdriver'
import { WebDriverFactory } from '../wd-factory'
import { ICapsConfig } from '../../../config/driver/i-caps-config'
import SelenoidConfigReader from '../../../config/driver/selenoid/selenoid-config-reader'
import { EdgeDriverCreator } from './edge-driver-creator'
import { EdgeCapabilitiesProvider } from './edge-capabilities-provider'
import { EdgeOptionsProvider } from './edge-options-provider'

export class EdgeDriverFactory extends WebDriverFactory {
  createDriver(browserConfig: ICapsConfig): WebDriver {
    let selenoidCapabilities: Capabilities = new Capabilities()
    if (!isUndefined(this.selenoidConfig)) {
      selenoidCapabilities = new SelenoidConfigReader().readData(
        this.selenoidConfig
      )
    }

    let capabilities: Capabilities = new EdgeCapabilitiesProvider()
      .getCapabilities(browserConfig)
      .merge(new EdgeOptionsProvider().getOptions(browserConfig))
      .merge(selenoidCapabilities)

    console.info(capabilities)

    return new EdgeDriverCreator().createDriver(capabilities)
  }
}
