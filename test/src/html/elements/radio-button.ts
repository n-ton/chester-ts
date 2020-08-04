/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'
import IInteractiveElement from './interfaces/i-interactive-element'

export default class RadioButton extends AbstractElement {
  async isSelected(): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .isElementSelected(this)
  }

  async select(): Promise<IInteractiveElement> {
    if (!(await this.isSelected())) {
      this.performAction()
    }
    return this
  }

  async deselect(): Promise<IInteractiveElement> {
    if (await this.isSelected()) {
      this.performAction()
    }
    return this
  }

  async readValue(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValueOfElement(this, 'value')
  }

  async changeValue(value: any): Promise<void> {
    if (value instanceof Number) {
      value === 0 ? await this.deselect() : await this.select()
    } else if (value instanceof Boolean) {
      value === false ? await this.deselect() : await this.select()
    } else if (value instanceof String) {
      value === 'false' ? await this.deselect() : await this.select()
    }
  }
}
