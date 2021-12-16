import { ReportPortalConfig } from './rp-config'
import { AllureConfig } from './allure-config'
import { MochawesomeConfig } from './mochawesome-config'

export enum Reporters {
  SPEC = 'spec',
  MIN = 'min',
  ALLURE = 'allure-mocha',
  ALLURE2 = 'mocha-allure2-reporter',
  REPORT_PORTAL = '@reportportal/agent-js-mocha',
  MOCHAWESOME = 'mochawesome',
}

export const reporterConfig = {
  default: {
    reporter: Reporters.SPEC,
  },
  min: {
    reporter: Reporters.MIN,
  },
  rp_local: {
    reporter: Reporters.REPORT_PORTAL,
    reporterOptions: ReportPortalConfig,
  },
  allure: {
    reporter: Reporters.ALLURE,
    reporterOptions: AllureConfig,
  },
  allure2: {
    reporter: Reporters.ALLURE2,
    reporterOptions: AllureConfig,
  },
  mochawesome: {
    reporter: Reporters.MOCHAWESOME,
    reporterOptions: MochawesomeConfig,
  },
}
