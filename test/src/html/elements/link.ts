/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'
import ClickAction from './actions/click-action'

export default class Link extends AbstractElement {
  async getHref(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValueOfElement(this, 'href')
  }

  changeValue(): Promise<void> {
    throw new Error('Unsupported operation exception')
  }
}
