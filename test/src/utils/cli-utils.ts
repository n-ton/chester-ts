import { isUndefined } from 'util'
import path from 'path'
import { ICapsConfig } from '../config/driver/i-caps-config'
import { capsConfig } from '../config/driver/caps.config'
import { ISelenoidConfig } from '../config/driver/selenoid/i-selenoid-config'
import { selenoidConfig } from '../config/driver/selenoid/selenoid-config'
import IEnvConfig from '../config/env/i-env-config'
import { envConfig } from '../config/env/env-config'

export default class CliUtils {
  private static args: string[] = process.argv
  private static paramsMap: Map<string, string> = new Map()

  private static getParamsMap(): Map<string, string> {
    if (this.paramsMap.size === 0) {
      console.info(this.args)

      this.args.forEach((value, index) => {
        if (value.startsWith('--')) {
          if (
            this.args[index + 1] === undefined ||
            this.args[index + 1].startsWith('--')
          ) {
            throw new Error('Params count is not as expected.')
          }
          this.paramsMap.set(value.replace('--', ''), this.args[index + 1])
        }
      })
    }
    return this.paramsMap
  }

  static getArgs(): string[] {
    return CliUtils.args
  }

  static getRunner(): string {
    let pattern: string = 'runner.js'
    let str = this.getArgs()
      .find((value) => value.endsWith(pattern))
      ?.split(path.sep)
      .find((value) => value.endsWith(pattern))

    if (!isUndefined(str)) {
      return str?.substring(0, str.indexOf('-'))
    } else {
      return 'undefined'
    }
  }

  static getParam(key: string): string | undefined {
    return this.getParamsMap().get(key)
  }

  static getCapsConfigFromCli(): ICapsConfig {
    const value = this.getParam('capsConfig')

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
    const value = this.getParam('selenoidConfig')

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
    const value = this.getParamsMap().get('envConfig')

    let config
    if (isUndefined(value)) {
      console.warn(
        '--envConfig has not been provided in CLI, prod default config will be used.'
      )
      config = envConfig.prod
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
}
