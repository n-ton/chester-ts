import AbstractElement from "./abstract-element";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";

class Select extends AbstractElement {

    private isMulti: boolean = false;

    constructor(locator: string, context: IInteractiveContainer) {
        super(locator, context);
    }

    //TODO

}