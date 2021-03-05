import { ILocatable } from '../../../interfaces/i-locatable'
import AbstractAction from '../actions/abstract-action'

export default interface IInteractiveElement extends ILocatable {
  changeValue(...value: any): Promise<void>
  readValue(): string | Promise<string>
  performAction(action?: AbstractAction): Promise<void>
  isDisplayed(shouldWait?: boolean): Promise<boolean>
  isOptional(): boolean
  setOptional(optional: boolean): void
  isEnabled(): Promise<boolean>

  scrollTo(): Promise<void>
}
