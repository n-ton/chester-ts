import AbstractElementsContainer from './abstract-elements.container'

export default class TemplatedContainer<T extends AbstractElementsContainer> {
  private element: AbstractElementsContainer

  constructor(element: AbstractElementsContainer) {
    this.element = element
  }

  resolveTemplate(...text: string[]): T {
    let clone: AbstractElementsContainer = Object.create(this.element)
    let locator = clone.getLocator()
    text = text.reverse()
    if (locator !== undefined) {
      let index: number = locator.indexOf('%s')
      while (index !== -1) {
        index = locator.indexOf('%s')
        let textItem = text.pop()
        if (textItem !== undefined)
          locator = locator.replace(locator.charAt(index) + 's', textItem)
      }
      clone.setLocator(locator)
    }
    return clone as T
  }
}
