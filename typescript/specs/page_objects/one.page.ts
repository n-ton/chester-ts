import Text from '../../src/html/elements/text';
import { CurrentPackage } from '../containers/current-package.container';
import Button from '../../src/html/elements/button';
import { AbstractPage } from '../../src/html/containers/abstract-page';

export class OnePage extends AbstractPage {

    private static URL: string = `/scenario-one`;

    currentPackage: CurrentPackage = new CurrentPackage(`//*[@id='currentPackage']`, this);

    button: Button = new Button("(//button)[2]", this);
    header: Text = new Text('//h1', this);

    constructor() {
        super(OnePage.URL);
        this.addElement(this.currentPackage);
    }

}

export default new OnePage()