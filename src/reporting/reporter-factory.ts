import { allConfigs } from '../config/all-configs'
import { Reporters } from '../config/mocha/reporting/reporter-config'
import { AllureReporter } from './allure-reporter'
import IReporter from './i-reporter'
import { Log4jsReporter } from './log4js-reporter'

export default class ReporterFactory {
  static getReporter(category?: string): IReporter {
    switch (allConfigs.reporterConfig.reporter) {
      case Reporters.ALLURE: {
        return new AllureReporter(category)
      }
      default: {
        return new Log4jsReporter(category)
      }
    }
  }
}
