import { IWebDriverCookie, logging } from 'selenium-webdriver'

export interface IDriverManager {
  getCookies(): Promise<IWebDriverCookie[]>
  getCookie(name: string): Promise<IWebDriverCookie>
  addCookie(cookie: IWebDriverCookie): Promise<void>
  deleteCookie(cookie: string): Promise<void>
  getAvailableLogTypes(): Promise<string[]>
  getLogs(type: string): Promise<logging.Entry[]>
  getLogsFormatted(type: string): Promise<string>
}
