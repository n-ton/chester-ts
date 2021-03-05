import { WebDriver, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import { ISelenoidConfig } from '../../../config/driver/selenoid/i-selenoid-config'
import WebDriverBuilder from '../wd-builder'
import { allConfigs } from '../../../config/all-configs'
import { driverConfig } from '../../../config/driver/driver-config'

export class EdgeDriverCreator implements IWebDriverCreator {
  createDriver(capabilities: Capabilities): WebDriver {
    const selenoidConfig: ISelenoidConfig | undefined =
      allConfigs.selenoidConfig

    const webDriver: ThenableWebDriver = new WebDriverBuilder()
      .usingServer(selenoidConfig?.url)
      .withCapabilities(capabilities)
      .build()

    if (driverConfig.edge.maximize) webDriver.manage().window().maximize()

    return webDriver
  }
}
