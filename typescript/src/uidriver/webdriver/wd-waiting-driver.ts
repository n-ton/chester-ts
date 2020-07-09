import { FactoryProvider } from "../factory-provider";
import { WebDriver, WebElement, until, Condition } from 'selenium-webdriver';
import { config } from "../../config/config";
import { IWaitingDriver } from "../interfaces/i-waiting-driver";

export class WdWaitingDriver implements IWaitingDriver {

    async waitUntilElementIsVisible(element: ILocatable, timeout?: number) {
        const webElement: WebElement = await FactoryProvider.getWebDriverFactory().getElementDriver()
            .findElement(element);
        await this.waitUntil(until.elementIsVisible(webElement), timeout)
    }

    async waitUntilTitleIs(title: string, timeout?: number, message?: string) {
        await this.waitUntil(until.titleIs(title), timeout, message);
    }

    async waitUntilElementIsClickable(element: ILocatable, timeout?: number, message?: string) {
        const webElement: WebElement = await FactoryProvider.getWebDriverFactory().getElementDriver()
            .findElement(element);

        await this.waitUntil(until.elementIsVisible(webElement),
            timeout, message);
        await this.waitUntil(until.elementIsEnabled(webElement),
            timeout, message);
    }

    private async waitUntil<T>(condition: Condition<T>, timeout?: number, message?: string): Promise<void> {

        if (timeout == null || timeout == undefined) {
            timeout = config.waitUntil;
        }

        const msg: string = `Waiting for condition "${condition.description()}" with timeout ${timeout}`;
        console.log(msg);

        const driver: WebDriver = FactoryProvider.getWebDriverFactory().getDriver();
        try {
            await driver.wait(condition, timeout, message);
            console.log(`SUCCESS: Condition "${condition.description()}" met before timeout ${timeout}`);
        } catch (error) {
            console.log(`FAILED: Condition "${condition.description()}" with timeout ${timeout}`);
        }

    }

}