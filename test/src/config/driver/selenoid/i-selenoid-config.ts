import { IConfig } from '../../i-config'

export interface ISelenoidConfig extends IConfig {
  url: string
  enableVNC?: boolean
  enableVideo?: boolean
  enableLog?: boolean
  screenResolution?: string
  maxInstances?: number
  applicationContainers?: string[]
}
