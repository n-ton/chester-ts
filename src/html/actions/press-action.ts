import ILocatable from '../interfaces/i-locatable'
import { IActionsChain } from '../../uidriver/interfaces/i-actions-chain'
import { WdActionsChain } from '../../uidriver/webdriver/wd-actions-chain'
import AbstractAction from './abstract-action'

export default class PressAction extends AbstractAction {
  private iActionsChain: IActionsChain = new WdActionsChain()

  async dispatchAction(element: ILocatable): Promise<void> {
    await (await this.iActionsChain.press(element)).perform()
  }
}
