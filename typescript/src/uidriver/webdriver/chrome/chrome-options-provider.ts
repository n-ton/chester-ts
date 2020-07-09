import IOptionsProvider from "../interfaces/i-options-provider"
import * as chrome from 'selenium-webdriver/chrome'
import { ICapsConfig } from "../../../config/i-caps-config";
import CapsConfigReader from "../../../config/caps-config-reader";
import { Capabilities } from "selenium-webdriver";

export default class ChromeOptionsProvider implements IOptionsProvider {

    getOptions(browserConfig: ICapsConfig): Capabilities {

        let options = new CapsConfigReader().readOptions(browserConfig);
        if (options == undefined) {
            return new chrome.Options();
        } else {
            return options;
        }
    }
}
