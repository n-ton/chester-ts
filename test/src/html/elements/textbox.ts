import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'

export default class TextBox extends AbstractElement {
  async changeValue(...keysToSend: Array<string>) {
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .clearElement(this)
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .sendKeysToElement(this, ...keysToSend)
  }
}
