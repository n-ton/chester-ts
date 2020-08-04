import { Capabilities } from 'selenium-webdriver'
import { ICapsConfig } from '../../../config/driver/i-caps-config'

export default interface IOptionsProvider {
  getOptions(capsConfig: ICapsConfig): Capabilities
}
