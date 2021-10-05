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
import { WdActionsChain } from '../webdriver/wd-actions-chain'
import { baseConfig } from '../../config/base-config'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import AbstractElementsContainer from '../../html/containers/abstract-elements.container'
import { WdFactoryProvider } from './wd-factory-provider'
import { WdWaitDriver } from './wd-wait-driver'

export class WdElementDriver implements IElementDriver {
  private readonly reporter: IReporter = ReporterFactory.getReporter(
    WdElementDriver.name
  )

  private readonly wdWaitingDriver: WdWaitDriver = WdFactoryProvider.webDriverFactory().getWaitDriver()

  async findElement(element: AbstractElementsContainer): Promise<WebElement> {
    const driver: WebDriver = await WdFactoryProvider.webDriverFactory().getDriver()

    this.reporter.debug('Finding for element', `${element.getLoggableName()}`)

    return await this.webElementPromiseCallback(
      element,
      driver.findElement(By.xpath(element.getLocatorWithContextLookup()))
    )
  }

  public webElementPromiseCallback(
    element: AbstractElementsContainer,
    webElementPromise: WebElementPromise
  ): WebElementPromise {
    webElementPromise
      .then(() => {
        this.reporter.debug('Element found', `${element.getLoggableName()})}`)
      })
      .catch((e) => {
        this.reporter.warn(
          'Element not found',
          `${element.getLoggableName()}`,
          `${element.getLoggableContext()}`,
          e.name + ': ' + e.message
        )
      })
    return webElementPromise
  }

  async clearElement(element: AbstractElementsContainer): Promise<void> {
    return await (await this.findElement(element)).clear()
  }

  async sendKeysToElement(
    element: AbstractElementsContainer,
    ...keysToSend: Array<string | number | Promise<string | number>>
  ): Promise<void> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    await webElement.sendKeys(...keysToSend)
    await this.unHighlightElement(element)
  }

  async getText(element: AbstractElementsContainer): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    this.reporter.info('Getting text in', `${element.getLoggableName()}`)
    let text: string = await webElement.getText()
    this.reporter.info('Text in', `${element.getLoggableName()}`, `${text}`)
    await this.unHighlightElement(element)
    return text
  }

  async isStale(
    element: AbstractElementsContainer,
    shouldWait?: boolean
  ): Promise<boolean> {
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
    element: AbstractElementsContainer,
    shouldWait?: boolean | number,
    scrollTo: boolean = true
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
      if (scrollTo) {
        await this.scrollToElement(element)
      }
      await this.highlightElement(element)

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

  async clickOnElement(element: AbstractElementsContainer): Promise<void> {
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

  async contextClickOnElement(
    element: AbstractElementsContainer
  ): Promise<void> {
    await this.wdWaitingDriver.waitUntilElementIsClickable(element)

    await new WdActionsChain()
      .contextClick(element)
      .then((value) => value.perform())
  }

  async clickOnElementWithKeyPressed(
    element: AbstractElementsContainer,
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

  async getFullText(element: AbstractElementsContainer): Promise<string> {
    return await WdFactoryProvider.webDriverFactory()
      .getElementDriver()
      .getAttributeValue(element, 'textContent')
  }

  async isElementEnabled(element: AbstractElementsContainer): Promise<boolean> {
    let webElement: WebElement = await this.findElement(element)
    return await webElement.isEnabled()
  }

  async isElementSelected(
    element: AbstractElementsContainer
  ): Promise<boolean> {
    return await (await this.findElement(element)).isSelected()
  }

  async scrollToElement(element: AbstractElementsContainer): Promise<void> {
    this.reporter.debug('Scrolling to element', `${element.getLoggableName()}`)
    await this.executeScript(
      `arguments[0].scrollIntoView(${JSON.stringify(
        baseConfig.debugConfig.scrollIntoView.options
      )})`,
      element
    )
  }

  async takeElementScreenshot(
    element: AbstractElementsContainer
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async highlightElement(element: AbstractElementsContainer): Promise<void> {
    if (baseConfig.debugConfig.delay.enable) {
      await WdFactoryProvider.webDriverFactory().sleep(
        baseConfig.debugConfig.delay.time
      )
    }

    if (baseConfig.debugConfig.highlight.enable) {
      await this.executeScript(
        `arguments[0].style.border = '${baseConfig.debugConfig.highlight.styleBorder}'; `,
        element
      )
    }
  }

  async unHighlightElement(element: AbstractElementsContainer): Promise<void> {
    if (baseConfig.debugConfig.delay.enable) {
      await WdFactoryProvider.webDriverFactory().sleep(
        baseConfig.debugConfig.delay.time
      )
    }

    if (baseConfig.debugConfig.highlight.enable) {
      await this.executeScript("arguments[0].style.border='';", element)
    }
  }

  async addElementDebugInfo(
    element: AbstractElementsContainer,
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
    element: AbstractElementsContainer,
    attribute: string
  ): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    this.reporter.debug(
      'Getting attribute value',
      `${element.getLoggableName()} `,
      `${attribute} `
    )
    const value: string = await webElement.getAttribute(attribute)

    this.reporter.info(
      'Attribute value',
      `${element.getLoggableName()} `,
      `${value} `
    )
    await this.unHighlightElement(element)
    return value
  }

  async setAttributeValue(
    element: AbstractElementsContainer,
    attribute: string,
    value: string
  ): Promise<void> {
    let script: string = `arguments[0].setAttribute('${attribute}', '${value}')`
    await this.executeScript(script, element)
  }

  async getCssValue(
    element: AbstractElementsContainer,
    css: string
  ): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.scrollToElement(element)
    await this.highlightElement(element)
    this.reporter.debug(
      'Getting CSS value',
      `${element.getLoggableName()} `,
      `${css} `
    )
    const cssValue: string = await webElement.getCssValue(css)
    this.reporter.info(
      'CSS value',
      `${element.getLoggableName()} `,
      `${cssValue} `
    )
    await this.unHighlightElement(element)
    return cssValue
  }

  async executeScript<T>(
    script: string,
    element?: AbstractElementsContainer,
    ...args: any[]
  ): Promise<T> {
    if (element !== undefined) {
      let webElement: WebElement = await this.findElement(element)
      this.reporter.debug(
        'Executing script',
        `${script} `,
        `element: ${element.getLoggableName()} `
      )
      return await (
        await WdFactoryProvider.webDriverFactory().getDriver()
      ).executeScript(script, webElement, ...args)
    } else {
      this.reporter.debug('Executing script', `${script} `)
      return await (
        await WdFactoryProvider.webDriverFactory().getDriver()
      ).executeScript(script, ...args)
    }
  }

  async removeElementDebugInfo(element: AbstractElementsContainer) {
    const script: string =
      "var node = document.getElementById('wdDebugInfo');" +
      "if (node) {node.style.display = 'none'}"

    await this.executeScript(script, element)
  }

  async clickWithDelay(element: AbstractElementsContainer): Promise<void> {
    await new WdActionsChain()
      .press(element)
      .then((value) =>
        value
          .pause(2000)
          .then((value) => value.release().then((value) => value.perform()))
      )
  }
}
