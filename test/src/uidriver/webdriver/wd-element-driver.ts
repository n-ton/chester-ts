/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import {
  By,
  WebElement,
  WebDriver,
  WebElementPromise,
  IRectangle,
  error,
} from 'selenium-webdriver'
import { IKey } from 'selenium-webdriver/lib/input'
import { IElementDriver } from '../interfaces/i-element-driver'
import { FactoryProvider } from '../factory-provider'
import { WdActionsChain } from '../webdriver/wd-actions-chain'

export class WdElementDriver implements IElementDriver {
  async findElement(element: ILocatable): Promise<WebElement> {
    const driver: WebDriver = FactoryProvider.getWebDriverFactory().getDriver()
    let locator: any = element.getLocator()

    console.info(
      `Searching for element '${element.getLoggableName()}' in context '${element.getLoggableContext()}'`
    )

    if (!element.useContextLookup()) {
      return await this.webElementPromiseCallback(
        element,
        driver.findElement(By.xpath(locator))
      )
    } else {
      const elements: Array<ILocatable> = element.getLookupContext(true)

      if (elements.length !== 0) {
        let index: number = 0
        let contextElementPromise: WebElementPromise
        let elementPromise: WebElementPromise

        let context: any = elements[0]
        contextElementPromise = driver.findElement(
          By.xpath(context.getLocator())
        )
        await this.webElementPromiseCallback(context, contextElementPromise)

        while (index < elements.length - 1) {
          context = elements[++index]
          elementPromise = contextElementPromise.findElement(
            By.xpath(context.getLocator())
          )
          await this.webElementPromiseCallback(context, elementPromise)
          contextElementPromise = elementPromise
        }

        return await this.webElementPromiseCallback(
          element,
          contextElementPromise.findElement(By.xpath(locator))
        )
      } else {
        return await this.webElementPromiseCallback(
          element,
          driver.findElement(By.xpath(locator))
        )
      }
    }
  }

  private webElementPromiseCallback(
    element: ILocatable,
    webElementPromise: WebElementPromise
  ): WebElementPromise {
    webElementPromise
      .then(() => {
        console.info(`OK: Found element '${element.getLoggableName()}'`)
      })
      .catch((e) => {
        console.warn(`WARN: Element '${element.getLoggableName()}' not found`)
        console.warn(e.message)
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
    await this.highlightElement(element)
    await webElement.sendKeys(...keysToSend)
    await this.unHighlightElement(element)
  }

  async getText(element: ILocatable): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.highlightElement(element)
    let text: string = await webElement.getText()
    await this.unHighlightElement(element)
    return text
  }

  async isElementDisplayed(element: ILocatable): Promise<boolean> {
    try {
      const webElement = await this.findElement(element)
      await this.highlightElement(element)
      const state: boolean = await webElement.isDisplayed()
      await this.unHighlightElement(element)
      return state
    } catch (e) {
      console.warn(e.message)
      if (e instanceof error.NoSuchElementError) {
        return false
      } else {
        throw e
      }
    }
  }

  async clickOnElement(element: ILocatable): Promise<void> {
    const webElement: WebElement = await this.findElement(element)
    await this.highlightElement(element)
    console.log(`Click on element ${element.getLocator()}`)
    await this.unHighlightElement(element)
    await webElement.click()
  }

  async contextClickOnElement(element: ILocatable): Promise<void> {
    await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsClickable(element)

    await new WdActionsChain()
      .contextClick(element)
      .then((value) => value.perform())
  }

  async clickOnElementWithKeyPressed(
    element: ILocatable,
    key: IKey
  ): Promise<void> {
    await FactoryProvider.getWebDriverFactory()
      .getWaitingDriver()
      .waitUntilElementIsClickable(element)

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
      .getAttributeValueOfElement(element, 'textContent')
  }

  async isElementEnabled(element: ILocatable): Promise<boolean> {
    let webElement: WebElement = await this.findElement(element)
    return await webElement.isEnabled()
  }

  async isElementSelected(element: ILocatable): Promise<boolean> {
    return await (await this.findElement(element)).isSelected()
  }

  async scrollToElement(element: ILocatable): Promise<void> {
    await this.executeScript('arguments[0].scrollIntoView(false)', element)
  }

  async takeElementScreenshot(element: ILocatable): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async highlightElement(element: ILocatable): Promise<void> {
    await this.executeScript(
      "arguments[0].style.border='5px solid red';",
      element
    )
  }

  async unHighlightElement(element: ILocatable): Promise<void> {
    await this.executeScript("arguments[0].style.border='';", element)
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

  async getAttributeValueOfElement(
    element: ILocatable,
    attribute: string
  ): Promise<string> {
    return (await this.findElement(element)).getAttribute(attribute)
  }

  async setAttributeValueOfElement(
    element: ILocatable,
    attribute: string,
    value: string
  ): Promise<void> {
    let script: string = `arguments[0].setAttribute('${attribute}', '${value}')`
    await this.executeScript(script, element)
  }

  async getCssValueOfElement(
    element: ILocatable,
    css: string
  ): Promise<string> {
    const webElement: WebElement = await this.findElement(element)
    await this.highlightElement(element)
    const cssValue: Promise<string> = webElement.getCssValue(css)
    await this.unHighlightElement(element)
    return cssValue
  }

  async executeScript(
    script: string,
    element?: ILocatable,
    ...args: any[]
  ): Promise<WebElement> {
    if (element !== undefined) {
      let webElement: WebElement = await this.findElement(element)
      console.log(
        `Executing script '${script}' on '${element.getLoggableName()}'`
      )
      return await FactoryProvider.getWebDriverFactory()
        .getDriver()
        .executeScript(script, webElement, ...args)
    } else {
      console.log(`Executing script '${script}'`)
      return await FactoryProvider.getWebDriverFactory()
        .getDriver()
        .executeScript(script, ...args)
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
