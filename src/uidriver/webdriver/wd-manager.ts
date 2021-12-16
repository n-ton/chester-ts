/* eslint-disable max-len */
import { IWebDriverCookie, logging } from 'selenium-webdriver'
import { Entry } from 'selenium-webdriver/lib/logging'
import IReporter from '../../reporting/i-reporter'
import ReporterFactory from '../../reporting/reporter-factory'
import { DateUtils } from '../../utils/date-utils'
import { IDriverManager } from '../interfaces/i-driver-manager'
import { WdFactoryProvider } from './wd-factory-provider'

export class WdManager implements IDriverManager {
  private static reporter: IReporter = ReporterFactory.getReporter(
    WdManager.name
  )

  async getCookies(): Promise<IWebDriverCookie[]> {
    return await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .getCookies()
  }

  async getCookie(name: string): Promise<IWebDriverCookie> {
    WdManager.reporter.info('Getting Cookie: ' + name)
    const cookie: IWebDriverCookie = await (
      await WdFactoryProvider.webDriverFactory().getDriver()
    )
      .manage()
      .getCookie(name)

    WdManager.reporter.info('Cookie: ' + JSON.stringify(cookie))
    return cookie
  }

  async addCookie(cookie: IWebDriverCookie): Promise<void> {
    WdManager.reporter.info('Adding Cookie: ' + JSON.stringify(cookie))
    await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .addCookie(cookie)
  }

  async deleteCookie(cookie: string): Promise<void> {
    WdManager.reporter.info('Deleting Cookie: ' + cookie)
    await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .deleteCookie(cookie)
  }

  async getAvailableLogTypes(): Promise<string[]> {
    return await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .logs()
      .getAvailableLogTypes()
  }

  async getLogs(type: string): Promise<logging.Entry[]> {
    WdManager.reporter.info('Getting logs for type', type)
    return await (await WdFactoryProvider.webDriverFactory().getDriver())
      .manage()
      .logs()
      .get(type)
  }

  async getLogsFormatted(type: string): Promise<string> {
    const logs: string[] = []
    let entries: logging.Entry[]

    const filter = (s: Entry) => {
      if (!s.message.includes('exhaust_testing.js')) return s
    }

    if (type === logging.Type.BROWSER)
      entries = (await this.getLogs(type)).filter(filter)
    else entries = await this.getLogs(type)

    for (let index = 0; index < entries.length; index++) {
      let entry: logging.Entry = entries[index]
      logs.push(`[${DateUtils.toDateFormatted(entry.timestamp)}][${
        entry.level
      }] 
         ${type.toLocaleUpperCase()} - ${entry.message}`)
    }

    return logs.join('\n')
  }
}
