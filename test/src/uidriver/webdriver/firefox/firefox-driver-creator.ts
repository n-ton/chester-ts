import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { WebDriver, ThenableWebDriver } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import { ISelenoidConfig } from '../../../config/driver/selenoid/i-selenoid-config'
import WebDriverBuilder from '../wd-builder'
import { driverConfig } from '../../../config/driver/driver-config'
import { allConfigs } from '../../../config/all-configs'

export class FirefoxDriverCreator implements IWebDriverCreator {
  createDriver(capabilities: Capabilities): WebDriver {
    const selenoidConfig: ISelenoidConfig | undefined =
      allConfigs.selenoidConfig

    const webDriver: ThenableWebDriver = new WebDriverBuilder()
      .usingServer(selenoidConfig?.url)
      .withCapabilities(capabilities)
      .build()

    if (driverConfig.firefox.maximize) webDriver.manage().window().maximize()

    return webDriver
  }
}
