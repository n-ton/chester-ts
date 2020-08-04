import CliUtils from '../utils/cli-utils'

const capsConfig = CliUtils.getCapsConfigFromCli()
const envConfig = CliUtils.getEnvConfigFromCli()
const selenoidConfig = CliUtils.getSelenoidConfigFromCli()

export const allConfigs = {
  capsConfig,
  envConfig,
  selenoidConfig,
}
