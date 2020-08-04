import AbstractElement from './abstract-element'

export default class Button extends AbstractElement {
  changeValue(value: any): Promise<void> {
    throw new Error('Operation is not supported')
  }
}
