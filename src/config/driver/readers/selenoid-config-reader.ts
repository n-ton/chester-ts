import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ISelenoidConfig } from '../i-selenoid-config'

export default class SelenoidConfigReader {
  readData(config: ISelenoidConfig): Capabilities {
    const capabilities: Capabilities = new Capabilities()

    capabilities.set('enableVNC', config.enableVNC)
    capabilities.set('enableVideo', config.enableVideo)
    capabilities.set('enableLog', config.enableLog)
    capabilities.set('screenResolution', config.screenResolution)
    capabilities.set('videoCodec', config.videoCodec)

    return capabilities
  }
}
