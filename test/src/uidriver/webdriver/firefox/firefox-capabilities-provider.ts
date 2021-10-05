import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config'
import CapsConfigReader from '../../../config/driver/readers/capabilities-config-reader'
import { ICapabilitiesProvider } from '../interfaces/i-capabilities-provider'

export class FirefoxCapabilitiesProvider implements ICapabilitiesProvider {
  getCapabilities(browserConfig: ICapsConfig): Capabilities {
    return Capabilities.firefox().merge(
      new CapsConfigReader().readCapabilities(browserConfig)
    )
  }
}
