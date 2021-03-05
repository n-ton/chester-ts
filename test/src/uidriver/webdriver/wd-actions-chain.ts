import { Actions, WebElement } from 'selenium-webdriver'
import { ILocatable } from '../../interfaces/i-locatable'
import IReporter from '../../reporting/i-reporter'
import ReporterFactory from '../../reporting/reporter-factory'
import { FactoryProvider } from '../factory-provider'
import { IActionsChain } from '../interfaces/i-actions-chain'
import { WdElementDriver } from './wd-element-driver'

export class WdActionsChain implements IActionsChain {
  private elementDriver: WdElementDriver
  private actions: Actions | undefined = undefined
  private reporter: IReporter = ReporterFactory.getReporter(WdActionsChain.name)

  constructor() {
    this.elementDriver = FactoryProvider.getWebDriverFactory().getElementDriver()
  }

  async initActions(): Promise<IActionsChain> {
    this.actions = (
      await FactoryProvider.getWebDriverFactory().getDriver()
    ).actions()
    return this
  }

  async contextClick(element: ILocatable): Promise<IActionsChain> {
    const webElement: WebElement = await this.elementDriver.findElement(element)
    this.actions?.contextClick(webElement)
    return this
  }

  async clear(): Promise<IActionsChain> {
    await this.actions?.clear()
    return this
  }

  async click(element: ILocatable): Promise<IActionsChain> {
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

  async press(element: ILocatable): Promise<IActionsChain> {
    await this.elementDriver.scrollToElement(element)
    this.reporter.info(`Press on ${element.getFullLocator()}`)
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
}
