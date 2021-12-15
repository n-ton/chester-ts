import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { ICapsConfig } from '../i-capabilities-config'

export interface ICapsConfigReader {
  readCapabilities(config: ICapsConfig): Capabilities
  readOptions(config: ICapsConfig): Capabilities | undefined
}
