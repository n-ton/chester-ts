/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'

export default class Link extends AbstractElement {
  async getHref(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, 'href')
  }

  changeValue(): Promise<void> {
    throw new Error('Unsupported operation exception')
  }
}
