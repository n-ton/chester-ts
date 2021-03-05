import { WebElement } from 'selenium-webdriver'
import { isUndefined } from 'lodash'
import { FactoryProvider } from '../../uidriver/factory-provider'
import IInteractiveContainer from '../containers/interfaces/i-interactive-container'
import { ILocatable } from '../../interfaces/i-locatable'
import IInteractiveElement from './interfaces/i-interactive-element'
import AbstractAction from './actions/abstract-action'

export default abstract class AbstractElement implements IInteractiveElement {
  private locator: string
  private name: string = this.constructor.name
  private optional: boolean
  private contextLookup: boolean
  private context: ILocatable

  constructor(
    locator: string,
    context: IInteractiveContainer,
    optional: boolean = false,
    contextLookup: boolean = true
  ) {
    this.locator = locator
    this.context = context
    this.optional = optional
    this.contextLookup = contextLookup
  }

  async scrollTo(): Promise<void> {
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .scrollToElement(this)
  }

  setName(name: string): void {
    this.name = name
  }

  getName(): string {
    return this.name
  }

  getLocator(): string {
    return this.locator
  }

  setLocator(locator: string) {
    this.locator = locator
  }

  isOptional(): boolean {
    return this.optional
  }

  setOptional(optional: boolean) {
    this.optional = optional
  }

  getContext(): ILocatable {
    return this.context
  }

  setContext(context: ILocatable): void {
    this.context = context
  }

  useContextLookup(): boolean {
    return this.contextLookup
  }

  setContextLookup(contextLookup: boolean) {
    this.contextLookup = contextLookup
  }

  getLookupContext(): Array<ILocatable> | undefined {
    let elements: Array<ILocatable> = new Array<ILocatable>()

    if (this.useContextLookup()) {
      let context: any = this.getContext()

      while (!(isUndefined(context) || isUndefined(context.getLocator()))) {
        elements.push(context)
        if (!context.useContextLookup()) {
          break
        } else {
          context = context.getContext()
        }
      }
    } else {
      return undefined
    }
    return elements.reverse()
  }

  getFullLocator(): string {
    let elements: Array<ILocatable> | undefined = this.getLookupContext()
    let fullLocator: string = this.locator

    if (isUndefined(elements)) {
      return this.getLocator()
    } else {
      while (elements.length > 0) {
        const locator = elements.pop()?.getLocator()
        if (!isUndefined(locator))
          fullLocator = fullLocator.replace('.', locator)
      }
      return fullLocator
    }
  }

  getLoggableContext(): string {
    let context = this.getLookupContext()
    return isUndefined(context)
      ? ''
      : context
          .map(
            (iLocatable) =>
              iLocatable.getName() + ' [' + iLocatable.getLocator() + ']'
          )
          .join(' > ')
  }

  getLocatableContext(): string {
    let context = this.getLookupContext()
    return isUndefined(context)
      ? ''
      : context.map((iLocatable) => iLocatable.getLocator()).join(' > ')
  }

  getLoggableName(): string {
    return this.getName() + ' [' + this.getFullLocator() + ']'
  }

  async changeValue(...value: any): Promise<void> {
    await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .sendKeysToElement(this, value)
  }

  async readValue(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getText(this)
  }

  async performAction(action?: AbstractAction) {
    if (action === undefined) {
      await FactoryProvider.getWebDriverFactory()
        .getElementDriver()
        .clickOnElement(this)
    } else {
      await action.dispatchAction(this)
    }
  }

  async isStale(shouldWait?: boolean): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .isStale(this, shouldWait)
  }

  async isDisplayed(shouldWait?: boolean): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .isElementDisplayed(this, shouldWait)
  }

  async waitUntilIsVisible(timeout?: number): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsVisible(this, timeout)
  }

  async waitUntilIsNotVisible(timeout?: number): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsNotVisible(this, timeout)
  }

  async waitUntilIsLocated(timeout?: number): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsLocated(this, timeout)
  }

  async waitUntilIsStale(timeout?: number): Promise<void | boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsStale(this, timeout)
  }

  async waitUntilTextContains(
    text: string,
    timeout?: number
  ): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementTextContains(this, text, timeout)
  }

  async isEnabled(): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .isElementEnabled(this)
  }

  async getCssValue(css: string): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getCssValue(this, css)
  }

  async getAttributeValue(attribute: string): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, attribute)
  }
}
