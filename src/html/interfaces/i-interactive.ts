import AbstractAction from '../actions/abstract-action'
import ILocatable from './i-locatable'
import IReadable from './i-readable'

export default interface IInteractive extends ILocatable, IReadable {
  performAction(action?: AbstractAction): Promise<void>
  isDisplayed(
    scrollTo: boolean,
    checkInnerElements?: boolean,
    wait?: boolean | number
  ): Promise<boolean>
  scrollTo(): Promise<void>
  isEnabled(): Promise<boolean>
}
