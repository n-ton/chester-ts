import { IConfigReader } from "./i-config-reader";
import { ICapsConfig } from "./i-caps-config";
import { Capabilities } from "selenium-webdriver/lib/capabilities";

export interface ICapsConfigReader extends IConfigReader {

    readCapabilities(config: ICapsConfig): Capabilities;
    readOptions(config: ICapsConfig): Capabilities | undefined;
}