import { allConfigs } from '../../config/all-configs'
import { WebDriverFactory } from './wd-factory'
import { ChromeDriverFactory } from './chrome/chrome-driver-factory'
import { FirefoxDriverFactory } from './firefox/firefox-driver-factory'
import { EdgeDriverFactory } from './edge/edge-driver-factory'

export class WdFactoryProvider {
  private static FACTORY: WebDriverFactory = WdFactoryProvider.initWebDriverFactory()

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

  static webDriverFactory(): WebDriverFactory {
    return WdFactoryProvider.FACTORY
  }
}
