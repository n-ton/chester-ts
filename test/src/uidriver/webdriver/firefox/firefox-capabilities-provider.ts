import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ICapabilitiesProvider } from '../interfaces/i-capabilities-provider'
import CapsConfigReader from '../../../config/driver/caps-config-reader'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export class FirefoxCapabilitiesProvider implements ICapabilitiesProvider {
  getCapabilities(browserConfig: ICapsConfig): Capabilities {
    return Capabilities.firefox().merge(
      new CapsConfigReader().readCapabilities(browserConfig)
    )
  }
}
