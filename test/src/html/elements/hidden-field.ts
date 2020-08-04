import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'

export default class HiddenField extends AbstractElement {
  async changeValue(value: any): Promise<void> {
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .setAttributeValueOfElement(this, 'value', value)
  }
}
