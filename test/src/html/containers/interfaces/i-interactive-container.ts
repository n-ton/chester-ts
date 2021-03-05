import IInteractiveElement from '../../elements/interfaces/i-interactive-element'
import IElementsContainer from './i-elements-container'

export default interface IInteractiveContainer extends IElementsContainer {
  changeValue(element: IInteractiveElement, value: any): void
  readValue(element: IInteractiveElement): Promise<string>
  performAction(element: IInteractiveElement): Promise<void>
  scrollTo(): Promise<void>
  isDisplayed(shouldWait?: boolean): Promise<boolean>
  getText(): Promise<string>
}
