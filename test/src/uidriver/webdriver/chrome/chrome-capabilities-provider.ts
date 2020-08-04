import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ICapabilitiesProvider } from '../interfaces/i-capabilities-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export default class ChromeCapabilitiesProvider
  implements ICapabilitiesProvider {
  getCapabilities(capsConfig: ICapsConfig): Capabilities {
    return Capabilities.chrome().merge(
      new CapsConfigReader().readCapabilities(capsConfig)
    )
  }
}
