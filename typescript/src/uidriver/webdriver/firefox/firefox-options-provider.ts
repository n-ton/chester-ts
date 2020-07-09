import IOptionsProvider from "../interfaces/i-options-provider"
import { ICapsConfig } from "../../../config/i-caps-config";
import { Capabilities } from "selenium-webdriver/lib/capabilities";
import CapsConfigReader from "../../../config/caps-config-reader";
import * as firefox from 'selenium-webdriver/firefox'

export class FirefoxOptionsProvider implements IOptionsProvider {

    getOptions(browserConfig: ICapsConfig): Capabilities {

        let options = new CapsConfigReader().readOptions(browserConfig);
        if (options == undefined) {
            return new firefox.Options();
        } else {
            return options;
        }
    }

}