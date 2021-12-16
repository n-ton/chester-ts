import { isUndefined } from 'lodash'
import CliUtils from '../utils/cli-utils'
import UrlUtils from '../utils/url-utils'
import { allConfigs } from './all-configs'

function isHeadless(): boolean {
  const headless = CliUtils.getParam(CliUtils.HEADLESS_PARAM)

  return isUndefined(allConfigs.capsConfig.options?.headless)
    ? isUndefined(headless)
      ? false
      : headless === 'true'
    : allConfigs.capsConfig.options?.headless === true
}

function retries(): number {
  const retries = CliUtils.getParam(CliUtils.RETRIES_PARAM)
  return isUndefined(retries) ? 0 : +retries
}

function getReporter(): string | undefined {
  return CliUtils.getParam(CliUtils.REPORTER_CONFIG_PARAM)
}

function collectArtifacts(): boolean {
  const collectArtifacts = CliUtils.getParam(CliUtils.COLLECT_LOGS)
  return isUndefined(collectArtifacts) ? false : collectArtifacts === 'true'
}

export const baseConfig = {
  driver: 'webdriver',
  env: allConfigs.env,
  envConfig: allConfigs.envConfig,
  view: allConfigs.capsConfig.view,
  headless: isHeadless(),
  waitUntilCondition: 15000,
  timeouts: {
    script: 10000,
    pageLoad: 60000,
    implicit: 1000,
  },
  retries: retries(),
  reporter: getReporter(),
  debugConfig: allConfigs.debugConfig,
  collectArtifacts: collectArtifacts(),
}
