import { isUndefined } from 'lodash'
import { ICapsConfig } from '../config/driver/i-caps-config'
import { capsConfig } from '../config/driver/caps.config'
import { ISelenoidConfig } from '../config/driver/selenoid/i-selenoid-config'
import { selenoidConfig } from '../config/driver/selenoid/selenoid-config'
import IEnvConfig from '../config/env/i-env-config'
import { envConfig } from '../config/env/env-config'
import IReporterConfig from '../config/mocha/i-reporter-config'
import { reporterConfig } from '../config/mocha/reporter-config'
import { IDebugConfig } from '../config/debug/i-debug-config'
import { debugConfig } from '../config/debug/debug-config'
import { ISpecsConfig } from '../config/i-specs-config'
import { specsConfig } from '../../specs/specs-config'

export default class CliUtils {
  public static CAPS_CONFIG_PARAM: string = 'capsConfig'
  public static SELENOID_CONFIG_PARAM: string = 'selenoidConfig'
  public static ENV_CONFIG_PARAM: string = 'envConfig'
  public static REPORTER_CONFIG_PARAM: string = 'reporterConfig'
  public static APP_URL_PARAM: string = 'appUrl'
  public static HEADLESS_PARAM: string = 'headless'
  public static RETRIES_PARAM: string = 'retries'
  public static DEBUG_CONFIG_PARAM: string = 'debugConfig'
  public static SPECS_CONFIG_PARAM: string = 'specsConfig'
  public static SPEC_FILE_PARAM: string = 'specFile'
  public static SPECS_DIR_PARAM: string = 'specsDir'
  public static LOG_LEVEL_PARAM: string = 'logLevel'
  public static COLLECT_LOGS: string = 'collectArtifacts'
  public static GREP: string = 'grep'

  private static args: string[] = process.argv
  private static paramsMap: Map<string, string> = CliUtils.readParams()

  private static readParams(): Map<string, string> {
    let map: Map<string, string> = new Map<string, string>()
    this.args.forEach((value, index) => {
      if (value.startsWith('--')) {
        if (
          this.args[index + 1] === undefined ||
          this.args[index + 1].startsWith('--')
        ) {
          throw new Error('Params count is not as expected.')
        }
        map.set(value, this.args[index + 1])
      }
    })
    return map
  }

  static getArgs(): string[] {
    return CliUtils.args
  }

  static getParamsMap(): Map<string, string> {
    return this.paramsMap
  }

  static getSpecsConfigValue(): string {
    const specsConfigValue = this.getParam(this.SPECS_CONFIG_PARAM)
    return isUndefined(specsConfigValue) ? 'undefined' : specsConfigValue
  }

  static getParam(key: string): string | undefined {
    return this.paramsMap.get('--' + key)
  }

  static getCapsConfigFromCli(): ICapsConfig {
    const value = this.getParam(this.CAPS_CONFIG_PARAM)

    let caps
    if (isUndefined(value)) {
      console.warn(
        '--capsConfig has not been provided in CLI, chrome default caps will be used.'
      )
      caps = capsConfig.chrome
    } else {
      caps = Object.entries<ICapsConfig>(capsConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(caps)) {
        throw new Error(`--capsConfig ${value} has not been found`)
      }
    }

    console.info(`Applied capsConfig: ${JSON.stringify(caps)}`)
    return caps
  }

  static getSelenoidConfigFromCli(): ISelenoidConfig | undefined {
    const value = this.getParam(this.SELENOID_CONFIG_PARAM)

    let config
    if (isUndefined(value)) {
      config = undefined
    } else {
      config = Object.entries<ISelenoidConfig>(selenoidConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(config)) {
        throw new Error(`--selenoidConfig ${value} has not been found`)
      }
    }

    console.info(`Applied selenoidConfig: ${JSON.stringify(config)}`)
    return config
  }

  static getEnvConfigFromCli(): IEnvConfig {
    const value = this.getParam(this.ENV_CONFIG_PARAM)

    let config
    if (isUndefined(value)) {
      throw new Error('--envConfig required in CLI')
    } else {
      config = Object.entries<IEnvConfig>(envConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(config)) {
        throw new Error(`--envConfig ${value} has not been found`)
      }
    }

    console.info(`Applied envConfig: ${JSON.stringify(config)}`)
    return config
  }

  static getReporterConfigFromCli(): IReporterConfig {
    const value = this.getParam(this.REPORTER_CONFIG_PARAM)

    let config
    if (isUndefined(value)) {
      console.warn(
        '--reporterConfig has not been provided in CLI, default will be used.'
      )
      config = reporterConfig.default
    } else {
      config = Object.entries<IReporterConfig>(reporterConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(config)) {
        throw new Error(`--reporterConfig ${value} has not been found`)
      }
    }
    console.info(`Applied reporterConfig: ${JSON.stringify(config)}`)

    return config
  }

  static getDebugConfigFromCli(): IDebugConfig {
    const value = this.getParam(this.DEBUG_CONFIG_PARAM)

    let config
    if (isUndefined(value)) {
      console.warn(
        '--debugConfig has not been provided in CLI, default will be used.'
      )
      config = debugConfig.default
    } else {
      config = Object.entries<IDebugConfig>(debugConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(config)) {
        throw new Error(`--debugConfig ${value} has not been found`)
      }
    }

    console.info(`Applied debugConfig: ${JSON.stringify(config)}`)
    return config
  }

  static getSpecsConfigFromCli(): ISpecsConfig | undefined {
    const value = this.getParam(this.SPECS_CONFIG_PARAM)

    let config: ISpecsConfig | undefined
    if (isUndefined(value) || value === 'none') {
      console.warn('--specsConfig has not been provided in CLI')
      return undefined
    } else {
      config = Object.entries<ISpecsConfig>(specsConfig).find(
        (name) => name[0] === value
      )?.[1]

      if (isUndefined(config)) {
        throw new Error(`--specsConfig ${value} has not been found`)
      }

      console.info(`Applied specsConfig: ${JSON.stringify(config)}`)
      return config
    }
  }
}
