import { WebDriver, Capabilities } from 'selenium-webdriver'

export interface IWebDriverCreator {
  createDriver(capabilities: Capabilities): Promise<WebDriver>
}
