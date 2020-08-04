/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractElement from './abstract-element'
import IInteractiveElement from './interfaces/i-interactive-element'
import ISelectable from './interfaces/i-selectable'

export default class Checkbox extends AbstractElement implements ISelectable {
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
    return (await this.isSelected()).toString()
  }

  async changeValue(value: any): Promise<void> {
    if (value instanceof Number) {
      if (value === 0) {
        await this.deselect()
      } else {
        await this.select()
      }
    } else if (value instanceof Boolean) {
      if (value === false) {
        await this.deselect()
      } else {
        await this.select()
      }
    } else if (value instanceof String) {
      if (value === 'false') {
        await this.deselect()
      } else {
        await this.select()
      }
    }
  }
}
