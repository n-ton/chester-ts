import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { IConfigReader } from '../../i-config-reader'
import { ISelenoidConfig } from './i-selenoid-config'

export default class SelenoidConfigReader implements IConfigReader {
  readData(config: ISelenoidConfig): Capabilities {
    const capabilities: Capabilities = new Capabilities()

    capabilities.set('enableVNC', config.enableVNC)
    capabilities.set('enableVideo', config.enableVideo)
    capabilities.set('screenResolution', config.screenResolution)

    return capabilities
  }
}
