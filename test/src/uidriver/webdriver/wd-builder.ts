import { Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'

export default class WebDriverBuilder {
  private builder: Builder = new Builder()

  usingServer(url: string | undefined): WebDriverBuilder {
    if (url !== undefined) this.builder.usingServer(url)
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
