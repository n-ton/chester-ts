import { Actions, WebElement } from 'selenium-webdriver'
import AbstractElementsContainer from '../../html/containers/abstract-elements.container'
import IReporter from '../../reporting/i-reporter'
import ReporterFactory from '../../reporting/reporter-factory'
import { IActionsChain } from '../interfaces/i-actions-chain'
import { WdElementDriver } from './wd-element-driver'
import { WdFactoryProvider } from './wd-factory-provider'

export class WdActionsChain implements IActionsChain {
  private elementDriver: WdElementDriver
  private actions: Actions | undefined = undefined
  private reporter: IReporter = ReporterFactory.getReporter(WdActionsChain.name)

  constructor() {
    this.elementDriver = WdFactoryProvider.webDriverFactory().getElementDriver()
  }

  async initActions(): Promise<IActionsChain> {
    this.actions = (
      await WdFactoryProvider.webDriverFactory().getDriver()
    ).actions()
    return this
  }

  async contextClick(
    element: AbstractElementsContainer
  ): Promise<IActionsChain> {
    const webElement: WebElement = await this.elementDriver.findElement(element)
    this.actions?.contextClick(webElement)
    return this
  }

  async clear(): Promise<IActionsChain> {
    await this.actions?.clear()
    return this
  }

  async click(element: AbstractElementsContainer): Promise<IActionsChain> {
    const webElement: WebElement = await this.elementDriver.findElement(element)
    this.actions?.click(webElement)
    return this
  }

  async keyDown(key: string): Promise<IActionsChain> {
    this.actions?.keyDown(key)
    return this
  }

  async keyUp(key: string): Promise<IActionsChain> {
    this.actions?.keyUp(key)
    return this
  }

  async press(element: AbstractElementsContainer): Promise<IActionsChain> {
    await this.elementDriver.scrollToElement(element)
    this.reporter.info(`Press on ${element.getLoggableName()}`)
    this.actions?.press()
    return this
  }

  async perform(): Promise<void> {
    await this.actions?.perform()
  }

  async release(): Promise<IActionsChain> {
    this.actions?.release()
    return this
  }

  async pause(duration: number): Promise<IActionsChain> {
    this.actions?.pause(duration)
    return this
  }

  async mouseMove(element: AbstractElementsContainer): Promise<IActionsChain> {
    await this.elementDriver.scrollToElement(element)
    this.reporter.info(`Mouse move to ${element.getLoggableName()}`)
    await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .findElement(element)
      .then((elem) => {
        this.actions?.mouseMove(elem).perform()
      })
    return this
  }
}
