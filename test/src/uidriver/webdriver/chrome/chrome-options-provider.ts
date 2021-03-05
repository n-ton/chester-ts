import * as chrome from 'selenium-webdriver/chrome'
import { Capabilities } from 'selenium-webdriver'
import { isUndefined } from 'lodash'
import IOptionsProvider from '../interfaces/i-options-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export default class ChromeOptionsProvider implements IOptionsProvider {
  getOptions(capsConfig: ICapsConfig): Capabilities {
    const options = new CapsConfigReader().readOptions(capsConfig)
    if (isUndefined(options)) {
      return new chrome.Options()
    } else {
      return options
    }
  }
}
