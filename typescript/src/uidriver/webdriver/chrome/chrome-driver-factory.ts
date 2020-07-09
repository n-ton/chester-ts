import { WebDriverFactory } from "../wd-factory"
import { ChromeDriverCreator } from "./chrome-driver-creator";
import ChromeCapabilitiesProvider from "./chrome-capabilities-provider";
import { WebDriver, Capabilities } from "selenium-webdriver";
import ChromeOptionsProvider from "./chrome-options-provider";
import { ICapsConfig } from "../../../config/i-caps-config";

export class ChromeDriverFactory extends WebDriverFactory {

    createDriver(browserConfig: ICapsConfig): WebDriver {

        let capabilities: Capabilities = new ChromeCapabilitiesProvider().getCapabilities(browserConfig)
            .merge(new ChromeOptionsProvider().getOptions(browserConfig));

        console.info(capabilities);

        return new ChromeDriverCreator()
            .createDriver(capabilities);
    }

}