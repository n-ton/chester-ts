import AbstractElement from "./abstract-element";
import { FactoryProvider } from "../../uidriver/factory-provider";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

class Icon extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    async getClassValue(): Promise<string> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().getAttributeValueOfElement(this, 'class');
    }

    async readValue(): Promise<string> {
        return await super.readValue();
    }
}