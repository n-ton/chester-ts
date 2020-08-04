import { Capabilities } from 'selenium-webdriver'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export interface ICapabilitiesProvider {
  getCapabilities(capsConfig: ICapsConfig): Capabilities
}
