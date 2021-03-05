import { IPageDriver } from './i-page-driver'
import { IElementDriver } from './i-element-driver'
import { IWaitingDriver } from './i-waiting-driver'
import { IElementsDriver } from './i-elements-driver'

export interface IDriverFactory {
  // basic driver methods
  isDriverStarted(): boolean
  isBrowserAlive(): Promise<boolean | undefined>
  quitDriver(): Promise<void>
  getCurrentWindowHandle(): Promise<string | undefined>
  closeWindow(): Promise<void>
  getCurrentSessionId(): Promise<string | undefined>
  maximizeWindow(): Promise<void>
  sleep(amount: number): Promise<void>

  // specific drivers
  getPageDriver(): IPageDriver
  getElementDriver(): IElementDriver
  getElementsDriver(): IElementsDriver
  getWaitingDriver(): IWaitingDriver
}
