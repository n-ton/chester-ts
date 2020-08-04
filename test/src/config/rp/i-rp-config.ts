import { IConfig } from '../i-config'

export interface IReportPortalConfig extends IConfig {
  // required
  endpoint: string
  token: string
  launch: string
  project: string

  // note required
  description: string
}
