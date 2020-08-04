import { isUndefined } from 'util'
import { Capabilities, Browser } from 'selenium-webdriver/lib/capabilities'
import * as chrome from 'selenium-webdriver/chrome'
import * as edge from 'selenium-webdriver/edge'
import * as firefox from 'selenium-webdriver/firefox'
import ConfigReader from '../config-reader'
import { ICapsConfig } from './i-caps-config'
import { ICapsConfigReader } from './i-caps-config-reader'
import { BrowserName } from './i-caps-config'
import { IOptions } from './i-options'

export default class CapsConfigReader extends ConfigReader
  implements ICapsConfigReader {
  readCapabilities(config: ICapsConfig): Capabilities {
    let capabilities: Capabilities = new Capabilities()

    switch (config.browserName) {
      case BrowserName.CHROME: {
        capabilities.setBrowserName(Browser.CHROME)
        break
      }
      case BrowserName.EDGE: {
        capabilities.setBrowserName(Browser.EDGE)
        break
      }
      case BrowserName.FIREFOX: {
        capabilities.setBrowserName(Browser.FIREFOX)
        break
      }
      case BrowserName.IE: {
        capabilities.setBrowserName(Browser.IE)
        break
      }
      case BrowserName.SAFARI: {
        capabilities.setBrowserName(Browser.SAFARI)
        break
      }
    }

    if (!isUndefined(config.browserVersion)) {
      capabilities.setBrowserVersion(config.browserVersion)
    }

    return capabilities
  }

  readOptions(config: ICapsConfig): Capabilities | undefined {
    if (config.options !== undefined) {
      const iOptions: IOptions = config.options
      switch (config.browserName) {
        case BrowserName.CHROME: {
          let options = new chrome.Options()
          options = iOptions.headless ? options.headless() : options
          options =
            iOptions.mobileEmulation !== undefined
              ? options.setMobileEmulation({
                  deviceName: iOptions.mobileEmulation,
                })
              : options

          return options
        }
        case BrowserName.FIREFOX: {
          let options = new firefox.Options()
          return options
        }
        case BrowserName.EDGE: {
          const options = new edge.Options()
          options.set('ms:edgeChromium', iOptions.edgeChromium)

          return options
        }
        default: {
          throw new Error(
            `No options for the following browserName ${config.browserName}`
          )
        }
      }
    }
  }
}
