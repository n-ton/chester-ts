import { WebDriverFactory } from "../wd-factory"
import { EdgeDriverCreator } from "./edge-driver-creator"
import { EdgeCapabilitiesProvider } from "./edge-capabilities-provider"
import { EdgeOptionsProvider } from "./edge-options-provider"
import { WebDriver, Capabilities } from "selenium-webdriver"
import { ICapsConfig } from "../../../config/i-caps-config"

export class EdgeDriverFactory extends WebDriverFactory {

    createDriver(browserConfig: ICapsConfig): WebDriver {

        let capabilities: Capabilities = new EdgeCapabilitiesProvider().getCapabilities(browserConfig)
            .merge(new EdgeOptionsProvider().getOptions(browserConfig))

        console.info(capabilities)

        return new EdgeDriverCreator()
            .createDriver(capabilities)
    }

}