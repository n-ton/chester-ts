import { ReportPortalConfig } from '../rp/rp-config'

export const MochaConfig = {
  // reporter: '@reportportal/agent-js-mocha',
  reporterOptions: ReportPortalConfig,
  timeout: 250000,
}
