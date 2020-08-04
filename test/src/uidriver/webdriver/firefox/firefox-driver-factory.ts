import { WebDriver, Capabilities } from 'selenium-webdriver'
import { WebDriverFactory } from '../wd-factory'
import { ICapsConfig } from '../../../config/driver/i-caps-config'
import SelenoidConfigReader from '../../../config/driver/selenoid/selenoid-config-reader'
import { FirefoxDriverCreator } from './firefox-driver-creator'
import { FirefoxCapabilitiesProvider } from './firefox-capabilities-provider'
import { FirefoxOptionsProvider } from './firefox-options-provider'

export class FirefoxDriverFactory extends WebDriverFactory {
  createDriver(browserConfig: ICapsConfig): WebDriver {
    let selenoidCapabilities: Capabilities = new Capabilities()
    if (this.selenoidConfig !== undefined) {
      selenoidCapabilities = new SelenoidConfigReader().readData(
        this.selenoidConfig
      )
    }

    let capabilities: Capabilities = new FirefoxCapabilitiesProvider()
      .getCapabilities(browserConfig)
      .merge(new FirefoxOptionsProvider().getOptions(browserConfig))
      .merge(selenoidCapabilities)

    console.info(capabilities)

    return new FirefoxDriverCreator().createDriver(capabilities)
  }
}
