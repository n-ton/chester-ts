import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from '../containers/abstract-elements.container'
import IEditable from '../interfaces/i-editable'

export default class TextBox extends AbstractElementsContainer
  implements IEditable {
  async changeValue(...keysToSend: Array<string>) {
    await DriversFactory.elementDriver().clearElement(this)
    await DriversFactory.elementDriver().sendKeysToElement(this, ...keysToSend)
  }
}
