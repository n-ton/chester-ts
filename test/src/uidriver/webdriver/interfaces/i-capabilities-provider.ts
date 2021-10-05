import { Capabilities } from 'selenium-webdriver'
import { ICapsConfig } from '../../../config/driver/i-capabilities-config';

export interface ICapabilitiesProvider {
  getCapabilities(capsConfig: ICapsConfig): Capabilities
}
