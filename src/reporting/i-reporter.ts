import { WriteFileOptions } from 'fs'

export default interface IReporter {
  info(message: string | {}, ...args: any[]): void
  warn(message: string, ...args: any[]): void
  error(message: string, ...args: any[]): void
  fatal(message: string, ...args: any[]): void
  trace(message: string, ...args: any[]): void
  debug(message: string | {}, ...args: any[]): void

  attachScreenshot(name: string, content: string): void
  attachTestBody(name: string, content: string): void
  attachLogs(name: string, content: string): void
  attachFile(
    file: string,
    content: string | Buffer,
    options?: WriteFileOptions
  ): void
}

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
  DEBUG = 'debug',
  TRACE = 'trace',
}
