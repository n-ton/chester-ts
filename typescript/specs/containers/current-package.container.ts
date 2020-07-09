import AbstractContainer from "../../src/html/containers/abstract-container";
import Text from '../../src/html/elements/text';
import IInteractiveContainer from "../../src/html/containers/interfaces/i-interactive-container";


export class CurrentPackage extends AbstractContainer {

    title: Text = new Text(`//*[@class='jss1 jss41']`, this);

    constructor(locator: string, context?: IInteractiveContainer) {
        super(locator, undefined, context);
        this.addElement(this.title);
    }

}