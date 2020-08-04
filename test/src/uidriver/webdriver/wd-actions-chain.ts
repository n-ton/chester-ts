import { Actions, WebElement } from 'selenium-webdriver'
import { FactoryProvider } from '../factory-provider'
import { WdElementDriver } from './wd-element-driver'

export class WdActionsChain implements IActionsChain {
  private elementDriver: WdElementDriver
  private actions: Actions

  constructor() {
    this.elementDriver = FactoryProvider.getWebDriverFactory().getElementDriver()
    this.actions = FactoryProvider.getWebDriverFactory().getDriver().actions()
  }

  async contextClick(element: ILocatable): Promise<IActionsChain> {
    const webElement: WebElement = await this.elementDriver.findElement(element)
    this.actions.contextClick(webElement)
    return this
  }

  async clear(): Promise<IActionsChain> {
    await this.actions.clear()
    return this
  }

  async click(element: ILocatable): Promise<IActionsChain> {
    const webElement: WebElement = await this.elementDriver.findElement(element)
    this.actions.click(webElement)
    return this
  }

  async keyDown(key: string): Promise<IActionsChain> {
    this.actions.keyDown(key)
    return this
  }

  async keyUp(key: string): Promise<IActionsChain> {
    this.actions.keyUp(key)
    return this
  }

  async press(element: ILocatable): Promise<IActionsChain> {
    await this.elementDriver.scrollToElement(element)
    console.info(`Press on ${element.getLocator()}`)
    this.actions.press()
    return this
  }

  async perform(): Promise<void> {
    await this.actions.perform()
  }

  async release(): Promise<IActionsChain> {
    this.actions.release()
    return this
  }

  async pause(duration: number): Promise<IActionsChain> {
    this.actions.pause(duration)
    return this
  }
}
