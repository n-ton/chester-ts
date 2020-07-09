
import { IWebDriverCreator } from "../interfaces/i-wd-creator";
import { Capabilities } from "selenium-webdriver/lib/capabilities";
import { WebDriver, Builder } from "selenium-webdriver";

export class FirefoxDriverCreator implements IWebDriverCreator {

    createDriver(capabilities: Capabilities): WebDriver {
        
        return new Builder()
            .withCapabilities(capabilities)
            .build();
    }

}