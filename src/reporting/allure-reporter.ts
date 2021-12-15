import fs from 'fs'
import { allure } from 'allure-mocha/runtime'
import { isUndefined } from 'lodash'
import { allConfigs } from '../config/all-configs'
import FileUtils from '../utils/file-utils'
import { baseConfig } from '../config/base-config'
import { BrowserName } from '../config/driver/i-capabilities-config'
import { Log4jsReporter } from './log4js-reporter'

export class AllureReporter extends Log4jsReporter {
  attachScreenshot(name: string, content: string): void {
    FileUtils.mkDirs(allConfigs.screenshotsDir)
    const path: string =
      allConfigs.screenshotsDir + '/' + this.sanitizeFileName(name) + '.png'

    try {
      fs.writeFileSync(path, content, 'base64')
    } catch (error) {
      this.warn('Unable to attach screenshot', error)
    }

    this.attachFile(name, fs.readFileSync(path), 'image/png')
  }

  attachFile(name: string, content: string | Buffer, type?: string): void {
    isUndefined(type)
      ? allure.attachment(name, content, 'text/plain')
      : allure.attachment(name, content, type)
  }

  attachLogs(name: string, content: string): void {
    FileUtils.mkDirs(allConfigs.logsDir)
    const path: string =
      allConfigs.logsDir + '/' + this.sanitizeFileName(name) + '.log'

    try {
      fs.writeFileSync(path, content)
    } catch (error) {
      this.warn('Unable to attach logs', error)
    }

    this.attachFile(name, fs.readFileSync(path))
  }

  attachTestBody(name: string, content: string): void {
    try {
      this.attachFile(name + '.js', content)
    } catch (error) {
      this.warn('Unable to attach test body', error)
    }
  }

  populateEnvironmentProperties() {
    this.info('Populating env properties...')
    if (
      fs.existsSync(allConfigs.allureResults) &&
      !fs.existsSync(allConfigs.environmentProperties)
    ) {

      fs.appendFileSync(
        allConfigs.environmentProperties,
        `env=${allConfigs.env}\n`
      )
      fs.appendFileSync(
        allConfigs.environmentProperties,
        `view=${allConfigs.capsConfig.view}\n`
      )
      Object.entries(allConfigs.capsConfig)
        .filter((pair) => pair[0].startsWith('browser'))
        .forEach(([key, value]) =>
          fs.appendFileSync(
            allConfigs.environmentProperties,
            `${key}=${value}\n`
          )
        )
      if (!isUndefined(allConfigs.capsConfig.options)) {
        Object.entries(allConfigs.capsConfig.options).forEach(
          ([key, value]) => {
            fs.appendFileSync(
              allConfigs.environmentProperties,
              `browser.options.${key}=${JSON.stringify(value)}\n`
            )
          }
        )
      }
      fs.appendFileSync(
        allConfigs.environmentProperties,
        `testGrep=${allConfigs.regexp()}\n`
      )
      fs.appendFileSync(
        allConfigs.environmentProperties,
        allConfigs.capsConfig.browserName !== BrowserName.EDGE
          ? `headless=${baseConfig.headless}\n`
          : 'headless=false\n'
      )
    }
  }
}
