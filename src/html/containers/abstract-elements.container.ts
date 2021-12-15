import { WebElement } from 'selenium-webdriver'
import StringUtils from '../../utils/string-utils'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import { DriversFactory } from '../../uidriver/drivers-factory'
import IInteractive from '../interfaces/i-interactive'
import AbstractAction from '../actions/abstract-action'
import ILoggable from '../interfaces/i-loggable'

export default abstract class AbstractElementsContainer
  implements IInteractive, ILoggable {
  private readonly containerName: string = this.constructor.name
  private locator: string
  private parentContext: AbstractElementsContainer | undefined
  private readonly fullContext: Array<AbstractElementsContainer> = new Array<
    AbstractElementsContainer
  >()
  private readonly contextWithLookup: Array<
    AbstractElementsContainer
  > = new Array<AbstractElementsContainer>()
  private optional: boolean
  private useContextLookup: boolean
  private locatorWithContextLookup: string
  private readonly elements: Map<string, AbstractElementsContainer> = new Map<
    string,
    AbstractElementsContainer
  >()
  protected readonly reporter: IReporter = ReporterFactory.getReporter(
    AbstractElementsContainer.name
  )

  constructor(
    locator: string,
    context?: AbstractElementsContainer,
    useContextLookup: boolean = context === undefined ? false : true,
    optional: boolean = false
  ) {
    this.locator = locator
    this.parentContext = context
    this.useContextLookup = useContextLookup
    this.optional = optional
    this.locatorWithContextLookup = this.buildLocatorWithContextLookup()
    this.fullContext = this.buildContext(false)
    this.contextWithLookup = this.buildContext(true)
  }

  getLocator(): string {
    return this.locator
  }

  setLocator(locator: string) {
    this.locator = locator
  }

  getOptional() {
    return this.optional
  }

  setOptional(optional: boolean) {
    this.optional = optional
  }

  getLocatorWithContextLookup() {
    return this.locatorWithContextLookup
  }

  async isEnabled(): Promise<boolean> {
    return await DriversFactory.elementDriver().isElementEnabled(this)
  }

  async scrollTo(): Promise<void> {
    await DriversFactory.elementDriver().scrollToElement(this)
  }

  buildContext(useContextLookup: boolean): Array<AbstractElementsContainer> {
    let elements: Array<AbstractElementsContainer> = new Array<
      AbstractElementsContainer
    >()
    let context: AbstractElementsContainer | undefined = this.parentContext

    if (context) {
      if (!useContextLookup) {
        // simply collect all context
        while (context) {
          elements.push(context)
          context = context.parentContext
        }
      } else {
        while (context) {
          elements.push(context)

          if (!context.useContextLookup) {
            break
          } else {
            context = context.parentContext
          }
        }
      }
    }
    return elements.reverse()
  }

  private buildLocatorWithContextLookup(): string {
    let contextLocator = this.locator

    if (this.useContextLookup) {
      let elements: Array<AbstractElementsContainer> = this.buildContext(true)

      if (elements) {
        while (elements.length > 0) {
          const locator = elements.pop()?.locator
          if (locator !== undefined)
            contextLocator = contextLocator.replace('.', locator)
        }
      } else {
        return this.locator
      }
    } else {
      return this.locator
    }
    return contextLocator
  }

  getLoggableName(): string {
    return this.containerName + ' [' + this.locatorWithContextLookup + ']'
  }

  getLoggableContext(): string {
    const context: Array<AbstractElementsContainer> = this.buildContext(true)
    return context.length === 0
      ? 'Context not defined'
      : context
          .map(
            (container) =>
              container.containerName + ' [' + container.locator + ']'
          )
          .join(' > ')
  }

  getLocatableContext(): string {
    const context: Array<AbstractElementsContainer> = this.buildContext(true)
    return context.length === 0
      ? 'Context not defined'
      : context.map((container) => container.locator).join(' > ')
  }

  async readValue(): Promise<string> {
    return await DriversFactory.elementDriver().getText(this)
  }

  async performAction(action?: AbstractAction): Promise<void> {
    if (action === undefined) {
      return await DriversFactory.elementDriver().clickOnElement(this)
    } else {
      return await this.performAction(action)
    }
  }

  async isStale(shouldWait?: boolean): Promise<boolean> {
    return await DriversFactory.elementDriver().isStale(this, shouldWait)
  }

  async isDisplayed(
    scrollTo: boolean = true,
    checkInnerElements?: boolean,
    wait?: boolean | number
  ): Promise<boolean> {
    const containerDisplayed: boolean = await DriversFactory.elementDriver().isElementDisplayed(
      this,
      wait,
      scrollTo
    )
    if (!checkInnerElements || this.elements.size === 0) {
      return containerDisplayed
    } else {
      for (const [, element] of this.elements) {
        if (!element.optional) {
          let fail: boolean = true
          fail =
            !(await DriversFactory.elementDriver().isElementDisplayed(
              element,
              false,
              scrollTo
            )) && fail
          if (fail) {
            return false
          }
        }
      }
    }
    return true
  }

  getElements(): Map<string, AbstractElementsContainer> {
    return this.elements
  }

  addElement(element: AbstractElementsContainer) {
    let locator: any = element.locator
    this.elements.set(StringUtils.sanitize(locator), element)
  }

  async waitUntilIsVisible(timeout?: number): Promise<boolean | WebElement> {
    return await DriversFactory.waitDriver().waitUntilElementIsVisible(
      this,
      timeout
    )
  }

  async waitUntilIsNotVisible(): Promise<boolean | WebElement> {
    return await DriversFactory.waitDriver().waitUntilElementIsNotVisible(this)
  }

  async waitUntilIsStale(timeout?: number): Promise<void | boolean> {
    return await DriversFactory.waitDriver().waitUntilElementIsStale(
      this,
      timeout
    )
  }

  async waitUntilIsLocated(timeout?: number): Promise<boolean | WebElement> {
    return await DriversFactory.waitDriver().waitUntilElementIsLocated(
      this,
      timeout
    )
  }

  async getCssValue(css: string): Promise<string> {
    return await DriversFactory.elementDriver().getCssValue(this, css)
  }

  async getAttributeValue(attr: string): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(this, attr)
  }

  async waitUntilAttributeEquals(
    attr: string,
    value: string,
    timeout?: number
  ): Promise<boolean> {
    return await DriversFactory.waitDriver().waitUntilAttributeEquals(
      this,
      attr,
      value,
      timeout
    )
  }

  async isAreaHidden(): Promise<boolean> {
    return (await this.getAttributeValue('area-hidden')) === 'true'
  }
}
