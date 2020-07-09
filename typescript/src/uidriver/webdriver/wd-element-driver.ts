import { IElementDriver } from "../interfaces/i-element-driver";
import { By, WebElement, WebDriver, WebElementPromise, IRectangle } from 'selenium-webdriver'
import { FactoryProvider } from "../factory-provider";
import { WdActionsChain } from '../webdriver/wd-actions-chain';
import { IKey } from "selenium-webdriver/lib/input";

export class WdElementDriver implements IElementDriver {

    findElement(element: ILocatable): Promise<WebElement> {

        const driver: WebDriver = FactoryProvider.getWebDriverFactory().getDriver();
        let locator: any = element.getLocator();

        console.info(`Searching for element '${element.getLoggableName()}' in context '${element.getLoggableContext()}'`);

        if (!element.useContextLookup()) {
            return this.webElementPromiseCallback(element,
                driver.findElement(By.xpath(locator)));

        } else {

            const elements: Array<ILocatable> = element.getLookupContext(true);

            if (elements.length != 0) {
                let index: number = 0;
                let containerPromise: WebElementPromise;

                do {
                    const context: any = elements[index];
                    containerPromise = driver.findElement(By.xpath(context.getLocator()));
                    this.webElementPromiseCallback(context, containerPromise);
                    index++;
                } while (index < elements.length);

                return this.webElementPromiseCallback(element, containerPromise.findElement(By.xpath(locator)));
            } else {
                return this.webElementPromiseCallback(element,
                    driver.findElement(By.xpath(locator)));
            }
        }

    }

    private webElementPromiseCallback(element: ILocatable, webElementPromise: WebElementPromise): WebElementPromise {
        webElementPromise.then(() => {
            console.info(`SUCCESS: found element '${element.getLoggableName()}'`)
        }).catch((err) => {
            console.error(`FAILED: element '${element.getLoggableName()}' not found`)
            console.error(err)
        });
        return webElementPromise;
    }

    async clearElement(element: ILocatable): Promise<void> {
        return await (await this.findElement(element)).clear();
    }

    async sendKeysToElement(element: ILocatable, ...keysToSend: Array<string | number | Promise<string | number>>): Promise<void> {
        return await (await this.findElement(element)).sendKeys(...keysToSend);
    }

    async getText(element: ILocatable): Promise<string> {
        const webElement: WebElement = await this.findElement(element);
        return await webElement.getText();
    }

    async isElementDisplayed(element: ILocatable): Promise<boolean> {
        const webElement = await this.findElement(element);
        return await webElement.isDisplayed();
    }

    async clickOnElement(element: ILocatable): Promise<void> {
        const webElement: WebElement = await this.findElement(element);
        console.log(`Click on element ${element.getLocator()}`);
        return await webElement.click();
    }

    async contextClickOnElement(element: ILocatable): Promise<void> {
        await FactoryProvider.getWebDriverFactory().getWaitingDriver()
            .waitUntilElementIsClickable(element);

        (await new WdActionsChain()
            .contextClick(element))
            .perform();
    }

    async clickOnElementWithKeyPressed(element: ILocatable, key: IKey): Promise<void> {
        await FactoryProvider.getWebDriverFactory().getWaitingDriver()
            .waitUntilElementIsClickable(element);

        ((await new WdActionsChain()
            .keyDown(key.toString())
            .click(element))
            .keyUp(key.toString()))
            .perform();

    }

    getFullText(element: ILocatable): Promise<string> {
        return FactoryProvider.getWebDriverFactory().getElementDriver().getAttributeValueOfElement(element, 'textContent');
    }

    async isElementEnabled(element: ILocatable): Promise<boolean> {
        let webElement: WebElement = await this.findElement(element);
        return webElement.isEnabled();
    }

    async isElementSelected(element: ILocatable): Promise<boolean> {
        return await (await this.findElement(element)).isSelected();
    }

    async scrollToElement(element: ILocatable): Promise<void> {
        await this.executeScript('arguments[0].scrollIntoView(false)', element);
    }

    async takeElementScreenshot(element: ILocatable): Promise<string> {
        return await FactoryProvider.getWebDriverFactory().getDriver().takeScreenshot();
    }

    async highlightElement(element: ILocatable): Promise<void> {
        await this.executeScript("arguments[0].style.border='5px solid red';", element);
    }

    async unHighlightElement(element: ILocatable): Promise<void> {
        await this.executeScript("arguments[0].style.border='';", element);
    }

    async addElementDebugInfo(element: ILocatable, info: string, tooltip: string): Promise<void> {
        let webElement: WebElement = await this.findElement(element)

        let rect: IRectangle = await webElement.getRect()

        const script: string = "var node = document.getElementById('wdDebugInfo');"
            + "if (!node){"
            + "node = document.createElement('span');"
            + "node.id = 'wdDebugInfo';"
            + "node.style.position = 'fixed';"
            + "node.style.zIndex = '9999999';"
            + "node.style.color = 'white';"
            + "node.style.background = 'red';"
            + "node.style['font-weight'] = 'bold';"
            + "node.style['font-size'] = '10pt';"
            + "document.body.appendChild(node);}"
            + "node.innerHTML = arguments[3];"
            + "node.title = arguments[4];"
            + "node.style.display = 'block';"
            + "node.style.left = window.innerWidth < arguments[1] + node.offsetWidth ? (window.innerWidth - node.offsetWidth - 5) < 0 ? 0 + 'px': (window.innerWidth - node.offsetWidth - 5) + 'px' : arguments[1] + 'px';"
            + "node.style.top = arguments[2] - node.offsetHeight - 5 > 0 ? (arguments[2] - node.offsetHeight - 5) + 'px' : (arguments[2] + arguments[4].offsetHeight + 5) + 'px';"

        await this.executeScript(script, element, rect.x, rect.y, info, tooltip)
    }

    async getAttributeValueOfElement(element: ILocatable, attribute: string): Promise<string> {
        return (await this.findElement(element)).getAttribute(attribute);
    }

    async setAttributeValueOfElement(element: ILocatable, attribute: string, value: string): Promise<void> {
        let script: string = `arguments[0].setAttribute('${attribute}', '${value}')`;
        await this.executeScript(script, element);
    }

    async executeScript(script: string, element?: ILocatable, ...args: any[]): Promise<WebElement> {
        if (element != undefined) {
            let webElement: WebElement = await this.findElement(element);
            console.log(`Executing script '${script}' on '${element.getLoggableName()}'`);
            return await FactoryProvider.getWebDriverFactory().getDriver().executeScript(script, webElement, ...args);
        } else {
            console.log(`Executing script '${script}'`);
            return await FactoryProvider.getWebDriverFactory().getDriver().executeScript(script, ...args);
        }
    }

    async removeElementDebugInfo(element: ILocatable) {
        const script: string = "var node = document.getElementById('wdDebugInfo');" +
            "if (node) {node.style.display = 'none'}";

        await this.executeScript(script, element)
    }

}