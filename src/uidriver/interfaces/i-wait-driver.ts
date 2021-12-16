import { WebElement } from 'selenium-webdriver'
import ILocatable from '../../html/interfaces/i-locatable'
import { ICookie } from './i-cookie'

export interface IWaitDriver {
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
  waitUntilCookieExist(
    name: string,
    timeout: number
  ): Promise<ICookie | undefined>
  waitUntilElementIsLocated(
    element: ILocatable,
    timeout?: number
  ): Promise<boolean | WebElement>
  waitUntilUrlContains(
    text: string,
    timeout: number | undefined
  ): Promise<boolean>
  waitUntilUrlIs(url: string, timeout: number | undefined): Promise<boolean>
  waitUntilWindowHandlesCount(count: number, message?: string): Promise<boolean>
  waitUntilAttributeEquals(
    element: ILocatable,
    attr: string,
    value: string,
    timeout: number | undefined
  ): Promise<boolean>
}
