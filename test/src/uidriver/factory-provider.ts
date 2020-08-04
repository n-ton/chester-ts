import { allConfigs } from '../config/all-configs'
import { WebDriverFactory } from './webdriver/wd-factory'
import { ChromeDriverFactory } from './webdriver/chrome/chrome-driver-factory'
import { FirefoxDriverFactory } from './webdriver/firefox/firefox-driver-factory'
import { EdgeDriverFactory } from './webdriver/edge/edge-driver-factory'

export class FactoryProvider {
  private static FACTORY: WebDriverFactory = FactoryProvider.initWebDriverFactory()

  private static initWebDriverFactory(): WebDriverFactory {
    switch (allConfigs.capsConfig.browserName) {
      case 'chrome': {
        return new ChromeDriverFactory()
      }
      case 'firefox': {
        return new FirefoxDriverFactory()
      }
      case 'edge': {
        return new EdgeDriverFactory()
      }
      default: {
        throw new Error(
          `There is no driver for browser configuration '${allConfigs.capsConfig.browserName}'`
        )
      }
    }
  }

  static getWebDriverFactory(): WebDriverFactory {
    return FactoryProvider.FACTORY
  }
}
