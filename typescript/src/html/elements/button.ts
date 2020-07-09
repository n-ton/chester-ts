import AbstractElement from "./abstract-element";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

export default class Button extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    changeValue(value: any): Promise<void> {
        throw new Error('Operation is not supported');
    }
}