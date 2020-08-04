import { isUndefined } from 'util'
import { WebDriver, Capabilities } from 'selenium-webdriver'
import { WebDriverFactory } from '../wd-factory'
import { ICapsConfig } from '../../../config/driver/i-caps-config'
import SelenoidConfigReader from '../../../config/driver/selenoid/selenoid-config-reader'
import { ChromeDriverCreator } from './chrome-driver-creator'
import ChromeCapabilitiesProvider from './chrome-capabilities-provider'
import ChromeOptionsProvider from './chrome-options-provider'

export class ChromeDriverFactory extends WebDriverFactory {
  createDriver(capsConfig: ICapsConfig): WebDriver {
    let selenoidCapabilities: Capabilities = new Capabilities()
    if (!isUndefined(this.selenoidConfig)) {
      selenoidCapabilities = new SelenoidConfigReader().readData(
        this.selenoidConfig
      )
    }

    let capabilities: Capabilities = new ChromeCapabilitiesProvider()
      .getCapabilities(capsConfig)
      .merge(new ChromeOptionsProvider().getOptions(capsConfig))
      .merge(selenoidCapabilities)

    console.info(capabilities)

    return new ChromeDriverCreator().createDriver(capabilities)
  }
}
