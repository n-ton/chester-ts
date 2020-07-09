import IOptionsProvider from "../interfaces/i-options-provider"
import CapsConfigReader from "../../../config/caps-config-reader"
import { Capabilities } from "selenium-webdriver"
import { ICapsConfig } from "../../../config/i-caps-config"
import * as edge from 'selenium-webdriver/edge'

export class EdgeOptionsProvider implements IOptionsProvider {

    getOptions(browserConfig: ICapsConfig): Capabilities {
        
        let options = new CapsConfigReader().readOptions(browserConfig);
        if (options == undefined) {
            return new edge.Options();
        } else {
            return options;
        }
    }

}