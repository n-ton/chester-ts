/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'

export default class Image extends AbstractElement {
  async getSrc(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValueOfElement(this, 'src')
  }
}
