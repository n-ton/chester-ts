import { FactoryProvider } from '../../../uidriver/factory-provider'
import { IElementDriver } from '../../../uidriver/interfaces/i-element-driver'

export default abstract class AbstractAction {
  private iElementDriver: IElementDriver = FactoryProvider.getWebDriverFactory().getElementDriver()

  async dispatchAction(element: ILocatable): Promise<void> {
    //default action
    await this.iElementDriver.clickOnElement(element)
  }
}
