import ILocatable from '../interfaces/i-locatable'
import AbstractAction from './abstract-action'

export default class ClickAction extends AbstractAction {
  async dispatchAction(element: ILocatable): Promise<void> {
    await super.dispatchAction(element)
  }
}
