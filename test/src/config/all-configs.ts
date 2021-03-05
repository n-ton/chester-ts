import { isUndefined } from 'lodash'
import { LogLevel } from '../reporting/i-reporter'
import CliUtils from '../utils/cli-utils'

const capsConfig = CliUtils.getCapsConfigFromCli()
const envConfig = CliUtils.getEnvConfigFromCli()
const selenoidConfig = CliUtils.getSelenoidConfigFromCli()
const reporterConfig = CliUtils.getReporterConfigFromCli()
const debugConfig = CliUtils.getDebugConfigFromCli()
const specsConfig = CliUtils.getSpecsConfigFromCli()
const env = CliUtils.getParam(CliUtils.ENV_CONFIG_PARAM)
const specFile = CliUtils.getParam(CliUtils.SPEC_FILE_PARAM)
const allParams = CliUtils.getParamsMap()
const outDir: string = './test/target'
const specsDir = function () {
  const path = CliUtils.getParam(CliUtils.SPECS_DIR_PARAM)
  return isUndefined(path) ? `${outDir}/test/specs` : path
}
const logLevel = function () {
  const level = CliUtils.getParam(CliUtils.LOG_LEVEL_PARAM)
  return isUndefined(level) ? LogLevel.INFO : level
}
const regexp = function (): string {
  const regexp = CliUtils.getParam(CliUtils.GREP)
  return isUndefined(regexp) ? '' : regexp
}
const dataDir = `${outDir}/data`
const logsDir = `${dataDir}/logs`
const screenshotsDir = `${dataDir}/screenshots`
const allureResults = `${outDir}/allure-results`
const environmentProperties = `${allureResults}/environment.properties`

export const allConfigs = {
  capsConfig,
  envConfig,
  selenoidConfig,
  reporterConfig,
  debugConfig,
  specsConfig,
  env,
  specFile,
  allParams,
  outDir,
  specsDir,
  logLevel,
  dataDir,
  logsDir,
  screenshotsDir,
  allureResults,
  environmentProperties,
  regexp,
}
