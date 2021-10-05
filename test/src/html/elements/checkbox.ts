/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from '../containers/abstract-elements.container'
import IEditable from '../interfaces/i-editable'
import IInteractive from '../interfaces/i-interactive'
import ISelectable from '../interfaces/i-selectable'

export default class Checkbox extends AbstractElementsContainer
  implements ISelectable, IEditable {
  async isSelected(): Promise<boolean> {
    return await DriversFactory.elementDriver().isElementSelected(this)
  }

  async select(): Promise<IInteractive> {
    if (!(await this.isSelected())) {
      await this.performAction()
    }
    return this
  }

  async deselect(): Promise<IInteractive> {
    if (await this.isSelected()) {
      await this.performAction()
    }
    return this
  }

  async readValue(): Promise<string> {
    return (await this.isSelected()).toString()
  }

  async changeValue(value: Number | Boolean | String): Promise<void> {
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
