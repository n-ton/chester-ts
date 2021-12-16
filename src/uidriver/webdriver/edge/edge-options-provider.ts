import { Capabilities } from 'selenium-webdriver'
import * as edge from 'selenium-webdriver/edge'
import CapsConfigReader from '../../../config/driver/readers/capabilities-config-reader'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config'
import IOptionsProvider from '../interfaces/i-options-provider'

export class EdgeOptionsProvider implements IOptionsProvider {
  getOptions(browserConfig: ICapsConfig): Capabilities {
    const options = new CapsConfigReader().readOptions(browserConfig)
    if (options === undefined) {
      return new edge.Options()
    } else {
      return options
    }
  }
}
