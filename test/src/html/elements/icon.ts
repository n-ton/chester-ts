/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'

class Icon extends AbstractElement {
  async getClassValue(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, 'class')
  }

  async readValue(): Promise<string> {
    return await super.readValue()
  }
}
