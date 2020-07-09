import AbstractElement from "./abstract-element";
import { FactoryProvider } from "../../uidriver/factory-provider";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

export default class TextBox extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    async changeValue(...keysToSend: Array<string>) {
        await FactoryProvider.getWebDriverFactory().getElementDriver().clearElement(this);
        await FactoryProvider.getWebDriverFactory().getElementDriver().sendKeysToElement(this, ...keysToSend);
    }

}