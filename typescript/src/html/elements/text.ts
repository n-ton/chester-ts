import AbstractElement from "./abstract-element";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

export default class Text extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

}