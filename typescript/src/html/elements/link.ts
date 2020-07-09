import AbstractElement from "./abstract-element"
import { FactoryProvider } from "../../uidriver/factory-provider";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

class Link extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    async getHref(): Promise<string> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().getAttributeValueOfElement(this, 'href');
    }
}