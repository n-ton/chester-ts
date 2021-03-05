import { WebDriver, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import { driverConfig } from '../../../config/driver/driver-config'
import WebDriverBuilder from '../wd-builder'
import { ISelenoidConfig } from '../../../config/driver/selenoid/i-selenoid-config'
import { allConfigs } from '../../../config/all-configs'

export class ChromeDriverCreator implements IWebDriverCreator {
  createDriver(capabilities: Capabilities): WebDriver {
    const selenoidConfig: ISelenoidConfig | undefined =
      allConfigs.selenoidConfig

    const webDriver: ThenableWebDriver = new WebDriverBuilder()
      .usingServer(selenoidConfig?.url)
      .withCapabilities(capabilities)
      .build()

    if (driverConfig.chrome.maximize) webDriver.manage().window().maximize()

    return webDriver
  }
}
