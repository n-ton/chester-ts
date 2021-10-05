import { WebDriver, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import WebDriverBuilder from '../wd-builder'
import { allConfigs } from '../../../config/all-configs'
import { ISelenoidConfig } from '../../../config/driver/i-selenoid-config'

export class EdgeDriverCreator implements IWebDriverCreator {
  async createDriver(capabilities: Capabilities): Promise<WebDriver> {
    const selenoidConfig: ISelenoidConfig | undefined =
      allConfigs.selenoidConfig

    const webDriver: ThenableWebDriver = new WebDriverBuilder()
      .usingServer(selenoidConfig)
      .withCapabilities(capabilities)
      .build()

    return webDriver
  }
}
