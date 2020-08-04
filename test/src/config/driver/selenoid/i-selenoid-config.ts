import { IConfig } from '../../i-config'

export interface ISelenoidConfig extends IConfig {
  url: string
  enableVNC?: boolean
  enableVideo?: boolean
  screenResolution?: string
}
