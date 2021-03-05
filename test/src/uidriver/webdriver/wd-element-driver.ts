/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import {
  By,
  WebElement,
  WebDriver,
  WebElementPromise,
  IRectangle,
} from 'selenium-webdriver'
import { IKey } from 'selenium-webdriver/lib/input'
import { isNumber } from 'lodash'
import { IElementDriver } from '../interfaces/i-element-driver'
import { FactoryProvider } from '../factory-provider'
import { WdActionsChain } from './wd-actions-chain'
import { baseConfig } from '../../config/base-config'
import { ILocatable } from '../../interfaces/i-locatable'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import { WdWaitingDriver } from './wd-waiting-driver'

export class WdElementDriver implements IElementDriver {
  private reporter: IReporter = ReporterFactory.getReporter(
    WdElementDriver.name
  )

  private wdWaitingDriver: WdWaitingDriver = FactoryProvider.getWebDriverFactory().getWaitingDriver()

  async findElement(element: ILocatable): Promise<WebElement> {
    const driver: WebDriver = await FactoryProvider.getWebDriverFactory().getDriver()

    this.reporter.debug('Finding for element', `${element.getLoggableName()}`)

    return await this.webElementPromiseCallback(
      element,
      driver.findElement(By.xpath(element.getFullLocator()))
    )
  }

  public webElementPromiseCallback(
    element: ILocatable,
    webElementPromise: WebElementPromise
  ): WebElementPromise {
    webElementPromise
      .then(() => {
        this.reporter.debug('Element found', `${element.getLoggableName()}`)
      })
      .catch((e: Error) => {
        this.reporter.warn(
          'Element not found',
          `${element.getLoggableName()}`,
          e.name + ': ' + e.message
        )
      })
    return webElementPromise
  }

  async clearElement(element: ILocatable): Promise<void> {
    return await (await this.findElement(element)).clear()
  }

  async sendKeysToElement(
    element: ILocatable,
    ...keysToSend: Array<string | number | Promise<string | number>>
  ): Promise<void> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    await webElement.sendKeys(...keysToSend)
    await this.unHighlightElement(element)
  }

  async getText(element: ILocatable): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    this.reporter.info('Getting text in', `${element.getLoggableName()}`)
    let text: string = await webElement.getText()
    this.reporter.info('Text in', `${element.getLoggableName()}`, `${text}`)
    await this.unHighlightElement(element)
    return text
  }

  async isStale(element: ILocatable, shouldWait?: boolean): Promise<boolean> {
    let timeout: number = baseConfig.timeouts.implicit
    if (shouldWait) {
      timeout = baseConfig.waitUntilCondition
    }
    const state: Boolean | void = await this.wdWaitingDriver.waitUntilElementIsStale(
      element,
      timeout
    )
    if (state) {
      this.reporter.info('Element is stale', `${element.getLoggableName()}`)
      return true
    } else {
      this.reporter.info('Element in DOM', `${element.getLoggableName()}`)
      return false
    }
  }

  async isElementDisplayed(
    element: ILocatable,
    shouldWait?: boolean | number,
    scrollAndHighlight?: boolean
  ): Promise<boolean> {
    let timeout: number = baseConfig.timeouts.implicit
    if (isNumber(shouldWait)) {
      timeout = shouldWait
    } else if (shouldWait) {
      timeout = baseConfig.waitUntilCondition
    }

    let webElement: boolean | WebElement
    webElement = await this.wdWaitingDriver.waitUntilElementIsLocated(
      element,
      timeout
    )

    let state: boolean = false
    if (webElement instanceof WebElement) {
      if (scrollAndHighlight) {
        await this.scrollToElement(element)
        await this.highlightElement(element)
      }

      webElement = await this.wdWaitingDriver.waitUntilElementIsVisible(
        element,
        timeout
      )

      if (webElement instanceof WebElement) {
        state = await webElement.isDisplayed()
      }
      await this.unHighlightElement(element)

      if (state) {
        this.reporter.info(
          'Element is displayed',
          `${element.getLoggableName()}`
        )
      } else {
        this.reporter.info(
          'Element is not displayed',
          `${element.getLoggableName()}`
        )
      }
    }
    return state
  }

  async clickOnElement(element: ILocatable): Promise<void> {
    await this.scrollToElement(element)
    await this.highlightElement(element)
    await this.unHighlightElement(element)
    this.reporter.info('Click on element', `${element.getLoggableName()}`)
    try {
      await (await this.findElement(element)).click()
    } catch (e) {
      throw new Error(
        `Exception on click on element '${element.getLoggableName()}: '` + e
      )
    }
  }

  async contextClickOnElement(element: ILocatable): Promise<void> {
    await this.wdWaitingDriver.waitUntilElementIsClickable(element)

    await new WdActionsChain()
      .contextClick(element)
      .then((value) => value.perform())
  }

  async clickOnElementWithKeyPressed(
    element: ILocatable,
    key: IKey
  ): Promise<void> {
    await this.wdWaitingDriver.waitUntilElementIsClickable(element)

    await new WdActionsChain()
      .keyDown(key.toString())
      .then((value) =>
        value
          .click(element)
          .then((value) =>
            value.keyUp(key.toString()).then((value) => value.perform())
          )
      )
  }

  async getFullText(element: ILocatable): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(element, 'textContent')
  }

  async isElementEnabled(element: ILocatable): Promise<boolean> {
    let webElement: WebElement = await this.findElement(element)
    return await webElement.isEnabled()
  }

  async isElementSelected(element: ILocatable): Promise<boolean> {
    return await (await this.findElement(element)).isSelected()
  }

  async scrollToElement(element: ILocatable): Promise<void> {
    this.reporter.debug('Scrolling to element', `${element.getLoggableName()}`)
    await this.executeScript(
      `arguments[0].scrollIntoView(${JSON.stringify(
        baseConfig.debugConfig.scrollIntoView.options
      )})`,
      element
    )
  }

  async takeElementScreenshot(element: ILocatable): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async highlightElement(element: ILocatable): Promise<void> {
    if (baseConfig.debugConfig.highlight.enable) {
      await (await FactoryProvider.getWebDriverFactory().getDriver()).sleep(
        baseConfig.debugConfig.highlight.delay
      )

      await this.executeScript(
        `arguments[0].style.border = '${baseConfig.debugConfig.highlight.styleBorder}'; `,
        element
      )
    }
  }

  async unHighlightElement(element: ILocatable): Promise<void> {
    if (baseConfig.debugConfig.highlight.enable) {
      await (await FactoryProvider.getWebDriverFactory().getDriver()).sleep(
        baseConfig.debugConfig.highlight.delay
      )

      await this.executeScript("arguments[0].style.border='';", element)
    }
  }

  async addElementDebugInfo(
    element: ILocatable,
    info: string,
    tooltip: string
  ): Promise<void> {
    let webElement: WebElement = await this.findElement(element)

    let rect: IRectangle = await webElement.getRect()

    const script: string =
      "var node = document.getElementById('wdDebugInfo');" +
      'if (!node){' +
      "node = document.createElement('span');" +
      "node.id = 'wdDebugInfo';" +
      "node.style.position = 'fixed';" +
      "node.style.zIndex = '9999999';" +
      "node.style.color = 'white';" +
      "node.style.background = 'red';" +
      "node.style['font-weight'] = 'bold';" +
      "node.style['font-size'] = '10pt';" +
      'document.body.appendChild(node);}' +
      'node.innerHTML = arguments[3];' +
      'node.title = arguments[4];' +
      "node.style.display = 'block';" +
      "node.style.left = window.innerWidth < arguments[1] + node.offsetWidth ? (window.innerWidth - node.offsetWidth - 5) < 0 ? 0 + 'px': (window.innerWidth - node.offsetWidth - 5) + 'px' : arguments[1] + 'px';" +
      "node.style.top = arguments[2] - node.offsetHeight - 5 > 0 ? (arguments[2] - node.offsetHeight - 5) + 'px' : (arguments[2] + arguments[4].offsetHeight + 5) + 'px';"

    await this.executeScript(script, element, rect.x, rect.y, info, tooltip)
  }

  async getAttributeValue(
    element: ILocatable,
    attribute: string
  ): Promise<string> {
    return (await this.findElement(element)).getAttribute(attribute)
  }

  async setAttributeValue(
    element: ILocatable,
    attribute: string,
    value: string
  ): Promise<void> {
    let script: string = `arguments[0].setAttribute('${attribute}', '${value}')`
    await this.executeScript(script, element)
  }

  async getCssValue(element: ILocatable, css: string): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.highlightElement(element)
    this.reporter.info(
      'Getting CSS value',
      `${element.getLoggableName()}`,
      `${css}`
    )
    const cssValue: string = await webElement.getCssValue(css)
    this.reporter.info(
      'CSS value',
      `${element.getLoggableName()}`,
      `${cssValue}`
    )
    await this.unHighlightElement(element)
    return cssValue
  }

  async executeScript<T>(
    script: string,
    element?: ILocatable,
    ...args: any[]
  ): Promise<T> {
    if (element !== undefined) {
      let webElement: WebElement = await this.findElement(element)
      this.reporter.debug(
        'Executing script',
        `${script}`,
        `element: ${element.getLoggableName()}`
      )
      return await (
        await FactoryProvider.getWebDriverFactory().getDriver()
      ).executeScript(script, webElement, ...args)
    } else {
      this.reporter.debug('Executing script', `${script}`)
      return await (
        await FactoryProvider.getWebDriverFactory().getDriver()
      ).executeScript(script, ...args)
    }
  }

  async removeElementDebugInfo(element: ILocatable) {
    const script: string =
      "var node = document.getElementById('wdDebugInfo');" +
      "if (node) {node.style.display = 'none'}"

    await this.executeScript(script, element)
  }

  async clickWithDelay(element: ILocatable): Promise<void> {
    await new WdActionsChain()
      .press(element)
      .then((value) =>
        value
          .pause(2000)
          .then((value) => value.release().then((value) => value.perform()))
      )
  }
}
