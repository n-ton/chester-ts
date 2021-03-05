import { WebElement } from 'selenium-webdriver'
import { ILocatable } from '../../interfaces/i-locatable'

export interface IWaitingDriver {
  waitUntilElementIsVisible(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement>
  waitUntilElementIsNotVisible(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement>
  waitUntilElementIsStale(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean>
  waitUntilElementIsClickable(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement>
  waitUntilTitleIs(
    title: string,
    timeout?: number,
    message?: string
  ): Promise<boolean>
  waitUntilTitleMatches(
    title: RegExp,
    timeout?: number,
    message?: string
  ): Promise<boolean>
  waitUntilElementTextContains(
    element: ILocatable,
    text: string,
    timeout?: number,
    message?: string
  ): Promise<boolean | WebElement>
}
