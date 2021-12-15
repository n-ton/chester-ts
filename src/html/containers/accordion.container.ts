/* eslint-disable @typescript-eslint/quotes */
import Button from '../elements/button'
import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from './abstract-elements.container'

export default class Accordion extends AbstractElementsContainer {
  constructor(locator: string, context: AbstractElementsContainer) {
    super(locator, context)
    this.addElement(this.button)
  }

  private readonly button: Button = new Button(".//*[@role='button']", this)

  async performAction(): Promise<void> {
    await this.button.performAction()
    await DriversFactory.sleep(1000)
  }

  async isExpanded(waitFor: boolean = false): Promise<boolean> {
    const timeout: number = 2000
    let expanded: string = 'false'

    if (!waitFor) {
      expanded = await this.button.getAttributeValue('aria-expanded')
      return expanded === 'true'
    } else {
      const start: number = new Date().getTime()
      do {
        expanded = await this.button.getAttributeValue('aria-expanded')
        if (expanded === 'true') {
          this.reporter.debug('Accordion has been expanded.', expanded)
          return true
        }
        this.reporter.warn('Accordion has not been expanded yet.', expanded)
        DriversFactory.sleep(500)
      } while (new Date().getTime() - start < timeout)
    }
    this.reporter.warn('Accordion has not been expanded', timeout)
    return false
  }
}
