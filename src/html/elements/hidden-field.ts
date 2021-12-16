import IEditable from '../interfaces/i-editable'
import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from '../containers/abstract-elements.container'

export default class HiddenField extends AbstractElementsContainer
  implements IEditable {
  async changeValue(...value: any[]): Promise<void> {
    await DriversFactory.elementDriver().setAttributeValue(
      this,
      'value',
      value[0]
    )
  }
}
