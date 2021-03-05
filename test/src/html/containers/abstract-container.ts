import { WebElement } from 'selenium-webdriver'
import { isUndefined } from 'lodash'
import StringUtils from '../../utils/string-utils'
import IInteractiveElement from '../elements/interfaces/i-interactive-element'
import { FactoryProvider } from '../../uidriver/factory-provider'
import { ILocatable } from '../../interfaces/i-locatable'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import HttpUtils from '../../utils/http-utils'
import Image from '../elements/image'
import IInteractiveContainer from './interfaces/i-interactive-container'
import IBatchElementsContainer from './interfaces/i-batch-elements-container'
import { IHaveUrl } from './interfaces/i-haveurl'

export default class AbstractContainer
  implements IBatchElementsContainer, IHaveUrl {
  private name: string = this.constructor.name
  private locator: string | undefined
  protected url: string | undefined
  private context: ILocatable | undefined
  private optional: boolean
  private contextLookup: boolean
  private elements: Map<string, IInteractiveElement> = new Map<
    string,
    IInteractiveElement
  >()

  protected reporter: IReporter = ReporterFactory.getReporter(
    AbstractContainer.name
  )

  constructor(
    locator?: string,
    url?: string,
    context?: IInteractiveContainer,
    optional: boolean = false,
    contextLookup: boolean = true
  ) {
    this.locator = locator
    this.url = url
    this.context = context
    this.optional = optional
    this.contextLookup = contextLookup
  }

  async getText(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getText(this)
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

  setLocator(locator: string | undefined) {
    this.locator = locator
  }

  getLocator(): string | undefined {
    return this.locator
  }

  useContextLookup(): boolean {
    return this.contextLookup
  }

  setContextLookup(contextLookup: boolean): void {
    this.contextLookup = contextLookup
  }

  getContext(): ILocatable | undefined {
    return this.context
  }

  setContext(context: ILocatable): void {
    this.context = context
  }

  getUrl(): string | undefined {
    return this.url
  }

  setUrl(url: string): void {
    this.url = url
  }

  setOptional(optional: boolean): void {
    this.optional = optional
  }

  isOptional(): boolean {
    return this.optional
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
    let fullLocator: string | undefined = this.locator

    if (fullLocator) {
      if (elements) {
        while (elements.length > 0) {
          const locator = elements.pop()?.getLocator()
          if (!isUndefined(locator))
            fullLocator = fullLocator.replace('.', locator)
        }
      }
      return fullLocator
    } else {
      this.reporter.warn('Locator is not defined in container: ' + this.name)
      return ''
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

  changeValues(inputData: Map<string, object>): IBatchElementsContainer {
    throw new Error('Method not implemented.')
  }
  readValues(): Map<string, string> {
    throw new Error('Method not implemented.')
  }
  changeValue(element: IInteractiveElement, value: object): void {
    throw new Error('Method not implemented.')
  }

  readValue(element: IInteractiveElement): Promise<string> {
    return FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getText(element)
  }

  performAction(element: IInteractiveElement): Promise<void> {
    return FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .clickOnElement(element)
  }

  async isStale(shouldWait?: boolean): Promise<boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .isStale(this, shouldWait)
  }

  async isDisplayed(
    checkInnerElements?: boolean,
    shouldWait?: boolean | number,
    scrollAndHighlight: boolean = true
  ): Promise<boolean> {
    if (!checkInnerElements || this.elements.size === 0) {
      return await FactoryProvider.getWebDriverFactory()
        .getElementDriver()
        .isElementDisplayed(this, shouldWait, scrollAndHighlight)
    } else {
      for (const [, element] of this.elements) {
        const httpUtils: HttpUtils = new HttpUtils()
        if (!element.isOptional()) {
          let failCondition: boolean = false
          if (element instanceof Image) {
            failCondition =
              (await httpUtils.headRequest(await element.getSrc())) !== 200
          }
          failCondition =
            !(await FactoryProvider.getWebDriverFactory()
              .getElementDriver()
              .isElementDisplayed(element, false, scrollAndHighlight)) &&
            failCondition
          if (failCondition) {
            return false
          }
        }
      }
    }
    return true
  }

  getElement(elementId: string): IInteractiveElement {
    throw new Error('Method not implemented.')
  }
  getElements(): Map<string, IInteractiveElement> {
    return this.elements
  }

  addElement(element: IInteractiveElement) {
    let locator: any = element.getLocator()
    this.elements.set(StringUtils.sanitize(locator), element)
  }

  async waitUntilIsVisible(timeout?: number): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsVisible(this, timeout)
  }

  async waitUntilIsNotVisible(): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsNotVisible(this)
  }

  async waitUntilIsStale(timeout?: number): Promise<void | boolean> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsStale(this, timeout)
  }

  async waitUntilIsLocated(timeout?: number): Promise<boolean | WebElement> {
    return await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsLocated(this, timeout)
  }

  getCssValue(css: string): Promise<string> {
    return FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getCssValue(this, css)
  }
}
