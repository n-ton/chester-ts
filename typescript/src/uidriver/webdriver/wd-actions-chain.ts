import { FactoryProvider } from "../factory-provider"
import { Actions, WebElement } from 'selenium-webdriver'
import { WdElementDriver } from "./wd-element-driver"

export class WdActionsChain implements IActionsChain {

    private elementDriver: WdElementDriver;
    private actions: Actions;

    constructor() {
        this.elementDriver = FactoryProvider.getWebDriverFactory().getElementDriver();
        this.actions = FactoryProvider.getWebDriverFactory().getDriver().actions();
    }

    async contextClick(element: ILocatable): Promise<IActionsChain> {
        const webElement: WebElement = await this.elementDriver.findElement(element);
        this.actions.contextClick(webElement);
        return this;
    }

    async clear(): Promise<IActionsChain> {
        await this.actions.clear();
        return this;
    }

    async click(element: ILocatable): Promise<IActionsChain> {
        const webElement: WebElement = await this.elementDriver.findElement(element);
        this.actions.click(webElement);
        return this;
    }

    keyDown(key: string): IActionsChain {
        this.actions.keyDown(key);
        return this;
    }

    keyUp(key: string): IActionsChain {
        this.actions.keyUp(key);
        return this;
    }

    async press(element: ILocatable): Promise<IActionsChain> {
        await this.elementDriver.scrollToElement(element)
        console.info(`Press on ${element.getLocator()}`)
        this.actions.press()
        return this
    }

    async perform(): Promise<IActionsChain> {
        await this.actions.perform()
        return this
    }


}