import { Capabilities } from 'selenium-webdriver'
import * as edge from 'selenium-webdriver/edge'
import IOptionsProvider from '../interfaces/i-options-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export class EdgeOptionsProvider implements IOptionsProvider {
  getOptions(browserConfig: ICapsConfig): Capabilities {
    let options = new CapsConfigReader().readOptions(browserConfig)
    if (options === undefined) {
      return new edge.Options()
    } else {
      return options
    }
  }
}
