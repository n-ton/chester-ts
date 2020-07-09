import { ICapabilitiesProvider } from "../interfaces/i-capabilities-provider"
import { Capabilities } from "selenium-webdriver/lib/capabilities";
import { ICapsConfig } from "../../../config/i-caps-config";
import CapsConfigReader from "../../../config/caps-config-reader";

export default class ChromeCapabilitiesProvider implements ICapabilitiesProvider {

    getCapabilities(browserConfig: ICapsConfig): Capabilities {

        return Capabilities.chrome()
            .merge(new CapsConfigReader().readCapabilities(browserConfig));

    }

}