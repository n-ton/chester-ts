/* eslint-disable @typescript-eslint/quotes */
import Button from '../elements/button'
import ReporterFactory from '../../reporting/reporter-factory'
import { FactoryProvider } from '../../uidriver/factory-provider'
import AbstractContainer from './abstract-container'
import IInteractiveContainer from './interfaces/i-interactive-container'

export default class Accordion extends AbstractContainer {
  constructor(locator: string, context: IInteractiveContainer) {
    super(locator, undefined, context)
    this.addElement(this.button)
    this.reporter = ReporterFactory.getReporter(Accordion.name)
  }

  button: Button = new Button(".//*[@role='button']", this)

  async performAction(): Promise<void> {
    return await super.performAction(this.button)
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
          this.reporter.info('Accordion has been expanded.', expanded)
          return true
        }
        this.reporter.warn('Accordion has not been expanded yet.', expanded)
        FactoryProvider.getWebDriverFactory().sleep(500)
      } while (new Date().getTime() - start < timeout)
    }
    this.reporter.warn('Accordion has not been expanded', timeout)
    return false
  }
}
