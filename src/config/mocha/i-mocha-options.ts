import IReporterConfig from './reporting/i-reporter-config'

export interface IMochaOptions {
  reporterConfig: IReporterConfig
  timeout: number
  retries: number
}
