import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import CapsConfigReader from '../../../config/driver/readers/capabilities-config-reader'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config'
import { ICapabilitiesProvider } from '../interfaces/i-capabilities-provider'

export class FirefoxCapabilitiesProvider implements ICapabilitiesProvider {
  getCapabilities(browserConfig: ICapsConfig): Capabilities {
    return Capabilities.firefox().merge(
      new CapsConfigReader().readCapabilities(browserConfig)
    )
  }
}
