import { ITimeouts } from 'selenium-webdriver'
import { IConfig } from './i-config'
import IUserConfig from './user-config'

interface IBaseConfig extends IConfig {
  env: string
  baseUrl: string
  waitUntilCondition: number
  timeouts: ITimeouts
}
