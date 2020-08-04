import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { IConfigReader } from '../i-config-reader'
import { ICapsConfig } from './i-caps-config'

export interface ICapsConfigReader extends IConfigReader {
  readCapabilities(config: ICapsConfig): Capabilities
  readOptions(config: ICapsConfig): Capabilities | undefined
}
