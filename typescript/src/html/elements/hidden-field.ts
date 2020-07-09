import AbstractElement from "./abstract-element";
import { FactoryProvider } from "../../uidriver/factory-provider";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

export default class HiddenField extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    async changeValue(value: any): Promise<void> {
        await FactoryProvider.getWebDriverFactory().getElementDriver().setAttributeValueOfElement(this, 'value', value);
    }

}