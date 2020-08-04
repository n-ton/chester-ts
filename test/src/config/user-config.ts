import { IConfig } from './i-config'

export default interface IUserConfig extends IConfig {
  login: string
  password: string
}
