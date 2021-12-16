/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from '../containers/abstract-elements.container'

export default class RadioButton extends AbstractElementsContainer {
  async isSelected(): Promise<boolean> {
    return await DriversFactory.elementDriver().isElementSelected(this)
  }

  async select(): Promise<AbstractElementsContainer> {
    if (!(await this.isSelected())) {
      await this.performAction()
    }
    return this
  }

  async deselect(): Promise<AbstractElementsContainer> {
    if (await this.isSelected()) {
      await this.performAction()
    }
    return this
  }

  async readValue(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(this, 'value')
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
