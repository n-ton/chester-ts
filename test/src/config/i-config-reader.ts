import { IConfig } from './i-config'

export interface IConfigReader {
  readData(config: IConfig): any
}
