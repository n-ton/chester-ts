import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config'
import CapsConfigReader from '../../../config/driver/readers/capabilities-config-reader'
import { ICapabilitiesProvider } from '../interfaces/i-capabilities-provider'

export default class ChromeCapabilitiesProvider
  implements ICapabilitiesProvider {
  getCapabilities(capsConfig: ICapsConfig): Capabilities {
    return Capabilities.chrome().merge(
      new CapsConfigReader().readCapabilities(capsConfig)
    )
  }
}
