/* eslint-disable max-len */
import { WebElement } from 'selenium-webdriver'
import ILocatable from '../../html/interfaces/i-locatable'

export interface IElementsDriver {
  findElements(element: ILocatable): Promise<WebElement[]>
}
