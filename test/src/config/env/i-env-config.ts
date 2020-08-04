import { IConfig } from '../i-config'
import IUserConfig from '../user-config'

export default interface IEnvConfig extends IConfig {
  yourApp: {
    url: string
  }
}
