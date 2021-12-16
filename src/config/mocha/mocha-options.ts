import { isUndefined } from 'lodash'
import { allConfigs } from '../all-configs'
import { baseConfig } from '../base-config'
import CliUtils from '../../utils/cli-utils'
import IReporterOptions from './reporting/i-reporter-options'

function setReporterOptions(): IReporterOptions | undefined {
  const options = allConfigs.reporterConfig.reporterOptions

  if (isUndefined(options)) {
    return undefined
  }

  if (baseConfig.reporter?.includes('reportportal')) {
    options.launch = `${CliUtils.getSpecsConfigValue().toUpperCase()}`
    options.description = JSON.stringify(allConfigs.capsConfig)
  }

  return options
}

export const MochaOptions = {
  reporter: allConfigs.reporterConfig.reporter,
  reporterOptions: setReporterOptions(),
  timeout: 300000,
  retries: baseConfig.retries,
}
