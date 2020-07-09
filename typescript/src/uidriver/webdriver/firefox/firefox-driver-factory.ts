import { WebDriverFactory } from "../wd-factory"
import { FirefoxDriverCreator } from "./firefox-driver-creator"
import { FirefoxCapabilitiesProvider } from "./firefox-capabilities-provider"
import { WebDriver, Capabilities } from "selenium-webdriver";
import { FirefoxOptionsProvider } from "./firefox-options-provider";
import { ICapsConfig } from "../../../config/i-caps-config";

export class FirefoxDriverFactory extends WebDriverFactory {

    createDriver(browserConfig: ICapsConfig): WebDriver {

        let capabilities: Capabilities = new FirefoxCapabilitiesProvider().getCapabilities(browserConfig)
            .merge(new FirefoxOptionsProvider().getOptions(browserConfig))

        console.info(capabilities)

        return new FirefoxDriverCreator()
            .createDriver(capabilities)
    }

}