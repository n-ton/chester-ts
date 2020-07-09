import AbstractElement from "./abstract-element";
import { FactoryProvider } from "../../uidriver/factory-provider";
import IInteractiveElement from "./interfaces/i-interactive-element";
import ISelectable from "./interfaces/i-selectable";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

class Checkbox extends AbstractElement implements ISelectable {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    async isSelected(): Promise<boolean> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().isElementSelected(this);
    }

    async select(): Promise<IInteractiveElement> {
        if (!(await this.isSelected())) {
            this.performAction();
        }
        return this;
    }

    async deselect(): Promise<IInteractiveElement> {
        if (await this.isSelected()) {
            this.performAction();
        }
        return this;
    }

    async readValue(): Promise<string> {
        return (await this.isSelected()).toString();
    }

    async changeValue(value: any): Promise<void> {
        if (value instanceof Number) {
            if (value == 0) {
                await this.deselect();
            } else {
                await this.select();
            }
        } else if (value instanceof Boolean) {
            if (value == false) {
                await this.deselect();
            } else {
                await this.select();
            }
        } else if (value instanceof String) {
            if (value == 'false') {
                await this.deselect();
            } else {
                await this.select();
            }
        }

    }

}