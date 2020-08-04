import { isUndefined } from 'util'
import CliUtils from '../utils/cli-utils'
import { allConfigs } from './all-configs'

export const baseConfig = {
  env: CliUtils.getParam('envConfig'),
  baseUrl: isUndefined(CliUtils.getParam('appUrl'))
    ? allConfigs.envConfig.yourApp.url
    : CliUtils.getParam('appUrl'),
  waitUntilCondition: 10000,
  timeouts: {
    script: 10000,
    pageLoad: 10000,
    implicit: 10000,
  },
}
