import { WdFactoryProvider } from '../uidriver/webdriver/wd-factory-provider'

export default class CookieUtils {
  static async setCookie(name: string, value: string) {
    await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .executeScript<string>(`document.cookie = "${name}=${value}"`)
  }
}
