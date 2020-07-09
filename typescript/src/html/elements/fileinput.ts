import AbstractElement from "./abstract-element";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

class FileInput extends AbstractElement {

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }
}