import * as chrome from 'selenium-webdriver/chrome'
import { Capabilities } from 'selenium-webdriver'
import IOptionsProvider from '../interfaces/i-options-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export default class ChromeOptionsProvider implements IOptionsProvider {
  getOptions(capsConfig: ICapsConfig): Capabilities {
    let options = new CapsConfigReader().readOptions(capsConfig)
    if (options === undefined) {
      return new chrome.Options()
    } else {
      return options
    }
  }
}
