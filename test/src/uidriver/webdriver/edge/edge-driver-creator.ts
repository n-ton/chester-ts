import { WebDriver, Capabilities } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import CliUtils from '../../../utils/cli-utils'
import { ISelenoidConfig } from '../../../config/driver/selenoid/i-selenoid-config'
import WebDriverBuilder from '../wd-builder'

export class EdgeDriverCreator implements IWebDriverCreator {
  createDriver(capabilities: Capabilities): WebDriver {
    const selenoidConfig:
      | ISelenoidConfig
      | undefined = CliUtils.getSelenoidConfigFromCli()

    return new WebDriverBuilder()
      .usingServer(selenoidConfig?.url)
      .withCapabilities(capabilities)
      .build()
  }
}
