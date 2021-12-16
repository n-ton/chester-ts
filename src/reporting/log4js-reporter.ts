import fs from 'fs'
import { WriteFileOptions } from 'fs'
import { getLogger, Logger } from 'log4js'
import { allConfigs } from '../config/all-configs'
import FileUtils from '../utils/file-utils'
import StringUtils from '../utils/string-utils'
import IReporter from './i-reporter'

export class Log4jsReporter implements IReporter {
  private logger: Logger

  constructor(category?: string) {
    this.logger = getLogger(category)
    this.logger.level = allConfigs.logLevel()
  }

  info(message: string | {}, ...args: any[]): void {
    return !args.length
      ? this.logger.info(message)
      : this.logger.info(message, args)
  }

  warn(message: string, ...args: any[]): void {
    return !args.length
      ? this.logger.warn(message)
      : this.logger.warn(message, args)
  }

  error(message: string, ...args: any[]): void {
    return !args.length
      ? this.logger.error(message)
      : this.logger.error(message, args)
  }

  fatal(message: string, ...args: any[]): void {
    return !args.length
      ? this.logger.fatal(message)
      : this.logger.fatal(message, args)
  }

  trace(message: string, ...args: any[]): void {
    return !args.length
      ? this.logger.trace(message)
      : this.logger.trace(message, args)
  }

  debug(message: string | {}, ...args: any[]): void {
    return !args.length
      ? this.logger.debug(message)
      : this.logger.debug(message, args)
  }

  attachScreenshot(name: string, content: string): void {
    FileUtils.mkDirs(allConfigs.screenshotsDir)
    const path: string =
      allConfigs.screenshotsDir + '/' + this.sanitizeFileName(name) + '.png'
    try {
      this.attachFile(path, content, 'base64')
    } catch (error) {
      this.warn('Unable to attach screenshot', error)
    }
  }

  attachLogs(name: string, content: string): void {
    FileUtils.mkDirs(allConfigs.logsDir)
    const path: string =
      allConfigs.logsDir + '/' + this.sanitizeFileName(name) + '.log'

    try {
      this.attachFile(path, content)
    } catch (error) {
      this.warn('Unable to attach logs', error)
    }
  }

  attachTestBody(name: string, content: string): void {
    // not used
  }

  attachFile(
    file: string,
    content: string | Buffer,
    options?: WriteFileOptions
  ): void {
    fs.writeFileSync(file, content, options)
  }

  protected sanitizeFileName(name: string): string {
    return StringUtils.sanitize(name)
  }
}
