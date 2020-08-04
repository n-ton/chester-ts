import { IConfig } from '../i-config'
import { IReportPortalConfig } from '../rp/i-rp-config'

export interface IMochaConfig extends IConfig {
  reporter: string
  reporterOptions: IReportPortalConfig
  timeout: number
}
