import { Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'
import { ISelenoidConfig } from '../../config/driver/i-selenoid-config'

export default class WebDriverBuilder {
  private builder: Builder = new Builder()

  usingServer(config: ISelenoidConfig | undefined): WebDriverBuilder {
    if (config !== undefined)
      this.builder.usingServer(config.url + ':' + config.port + config.path)
    return this
  }

  withCapabilities(capabilities: Capabilities) {
    this.builder.withCapabilities(capabilities)
    return this
  }

  setChromeService(service: chrome.ServiceBuilder) {
    this.builder.setChromeService(service)
    return this
  }

  build(): ThenableWebDriver {
    return this.builder.build()
  }
}
