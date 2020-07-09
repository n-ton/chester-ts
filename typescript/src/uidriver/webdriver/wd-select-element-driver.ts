import { FactoryProvider } from "../factory-provider";
import { WebElement } from "selenium-webdriver";

class WdSelectElementDriver implements ISelectElementDriver {

    selectByIndex(element: ILocatable, index: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    selectByValue(element: ILocatable, value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    selectByVisibleText(element: ILocatable, text: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deselectAll(element: ILocatable): Promise<void> {
        throw new Error("Method not implemented.");
    }

}