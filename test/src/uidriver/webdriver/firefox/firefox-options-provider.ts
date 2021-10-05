import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import * as firefox from 'selenium-webdriver/firefox'
import { isUndefined } from 'lodash'
import IOptionsProvider from '../interfaces/i-options-provider'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config'
import CapsConfigReader from '../../../config/driver/readers/capabilities-config-reader'

export class FirefoxOptionsProvider implements IOptionsProvider {
  getOptions(browserConfig: ICapsConfig): Capabilities {
    const options = new CapsConfigReader().readOptions(browserConfig)
    if (isUndefined(options)) {
      return new firefox.Options()
    } else {
      return options
    }
  }
}
