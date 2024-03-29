/* eslint-disable @typescript-eslint/quotes */
import {
  Capabilities,
  Browser,
  PageLoadStrategy,
} from 'selenium-webdriver/lib/capabilities'
import * as chrome from 'selenium-webdriver/chrome'
import * as edge from 'selenium-webdriver/edge'
import * as firefox from 'selenium-webdriver/firefox'
import { isUndefined } from 'lodash'
import { Preferences } from 'selenium-webdriver/lib/logging'
import { logging } from 'selenium-webdriver'
import { baseConfig } from '../../base-config'
import { IOptions } from '../../../uidriver/webdriver/interfaces/i-options'
import { ICapsConfig, BrowserName } from '../i-capabilities-config'
import { ICapsConfigReader } from './i-capabilities-config-reader'

export default class CapsConfigReader implements ICapsConfigReader {
  readCapabilities(config: ICapsConfig): Capabilities {
    let capabilities: Capabilities = new Capabilities()
    !isUndefined(config.pageLoadStrategy)
      ? capabilities.setPageLoadStrategy(config.pageLoadStrategy)
      : capabilities.setPageLoadStrategy(PageLoadStrategy.EAGER)

    const prefs: Preferences = new logging.Preferences()
    prefs.setLevel(logging.Type.BROWSER, logging.Level.INFO)
    prefs.setLevel(logging.Type.DRIVER, logging.Level.INFO)
    prefs.setLevel(logging.Type.PERFORMANCE, logging.Level.OFF)
    capabilities.setLoggingPrefs(prefs)

    switch (config.browserName) {
      case BrowserName.CHROME: {
        capabilities.setBrowserName(Browser.CHROME)
        capabilities.set('VERBOSE', true)
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
    if (!isUndefined(config.options)) {
      const iOptions: IOptions = config.options
      switch (config.browserName) {
        case BrowserName.CHROME: {
          let options = new chrome.Options()

          if (
            isUndefined(config.options.headless) &&
            baseConfig.headless === true
          ) {
            options = options.headless()
          } else if (config.options.headless === true) {
            options = options.headless()
          }

          if (iOptions.mobileEmulation) {
            options.setMobileEmulation(iOptions.mobileEmulation)
          } else if (iOptions.windowSize) {
            options = options.windowSize(iOptions.windowSize)
          }

          // options.addArguments('--no-sandbox', '--log-level=3')
          // options.addArguments("--proxy-server='direct://'")
          // options.addArguments('--proxy-bypass-list=*')
          // options.addArguments('--no-proxy-server')
          return options
        }
        case BrowserName.FIREFOX: {
          let options = new firefox.Options()
          if (baseConfig.headless) {
            options = options.headless()
          }
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
