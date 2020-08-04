import { Capabilities } from 'selenium-webdriver/lib/capabilities'
import { IPageDriver } from './i-page-driver'
import { IElementDriver } from './i-element-driver'
import { IWaitingDriver } from './i-waiting-driver'

export interface IDriverFactory {
  // basic driver methods
  isDriverStarted(): boolean
  isBrowserAlive(): Promise<boolean | undefined>
  quitDriver(): Promise<void>
  getCapabilities(): Promise<Capabilities | undefined>
  getCurrentWindowHandle(): Promise<string | undefined>
  closeWindow(): Promise<void>
  getCurrentSessionId(): Promise<string | undefined>
  maximizeWindow(): Promise<void>

  // specific drivers
  getPageDriver(): IPageDriver
  getElementDriver(): IElementDriver
  getWaitingDriver(): IWaitingDriver
}
