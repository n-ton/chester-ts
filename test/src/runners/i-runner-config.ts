import { IConfig } from '../config/i-config'

export default interface IRunnerConfig extends IConfig {
  path: string
  specs: string[]
}
