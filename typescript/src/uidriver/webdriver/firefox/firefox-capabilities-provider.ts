import { ICapabilitiesProvider } from "../interfaces/i-capabilities-provider"
import CapsConfigReader from "../../../config/caps-config-reader";
import { ICapsConfig } from "../../../config/i-caps-config";
import { Capabilities } from "selenium-webdriver/lib/capabilities";

export class FirefoxCapabilitiesProvider implements ICapabilitiesProvider {

    getCapabilities(browserConfig: ICapsConfig): Capabilities {

        return Capabilities.firefox()
            .merge(new CapsConfigReader().readCapabilities(browserConfig));
    }

}