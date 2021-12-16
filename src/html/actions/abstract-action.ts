import ILocatable from '../interfaces/i-locatable'
import { IElementDriver } from '../../uidriver/interfaces/i-element-driver'
import { DriversFactory } from '../../uidriver/drivers-factory'

export default abstract class AbstractAction {
  private iElementDriver: IElementDriver = DriversFactory.elementDriver()

  async dispatchAction(element: ILocatable): Promise<void> {
    //default action
    await this.iElementDriver.clickOnElement(element)
  }
}
