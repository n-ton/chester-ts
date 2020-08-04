import { IConfig } from '../i-config'
import { IOptions } from './i-options'

export interface ICapsConfig extends IConfig {
  browserName: string
  browserVersion?: string
  pageLoadStrategy?: string
  options?: IOptions
}

export const BrowserName = {
  CHROME: 'chrome',
  EDGE: 'edge',
  FIREFOX: 'firefox',
  IE: 'ie',
  SAFARI: 'safari',
}
