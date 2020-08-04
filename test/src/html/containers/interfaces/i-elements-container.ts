import IInteractiveElement from '../../elements/interfaces/i-interactive-element'

export default interface IElementsContainer extends ILocatable {
  getElement(elementId: string): IInteractiveElement
  addElement(element: IInteractiveElement): void
  getElements(): Map<string, IInteractiveElement>
}
