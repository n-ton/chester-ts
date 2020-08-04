import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import * as firefox from 'selenium-webdriver/firefox'
import IOptionsProvider from '../interfaces/i-options-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export class FirefoxOptionsProvider implements IOptionsProvider {
  getOptions(browserConfig: ICapsConfig): Capabilities {
    let options = new CapsConfigReader().readOptions(browserConfig)
    if (options === undefined) {
      return new firefox.Options()
    } else {
      return options
    }
  }
}
