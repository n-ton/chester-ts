/* eslint-disable @typescript-eslint/quotes */
import Button from '../elements/button'
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractContainer from './abstract-container'
import IInteractiveContainer from './interfaces/i-interactive-container'

export default class Accordion extends AbstractContainer {
  constructor(locator: string, context: IInteractiveContainer) {
    super(locator, undefined, context)
    this.addElement(this.button)
  }

  button: Button = new Button(".//*[@role='button'][@aria-expanded]", this)

  async performAction(): Promise<void> {
    return await super.performAction(this.button)
  }

  async isExpanded(): Promise<boolean> {
    return (
      (await FactoryProvider.getWebDriverFactory()
        .getElementDriver()
        .getAttributeValueOfElement(this.button, 'aria-expanded')) === 'true'
    )
  }
}
