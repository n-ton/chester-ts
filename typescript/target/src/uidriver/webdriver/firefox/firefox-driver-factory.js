"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirefoxDriverFactory = void 0;
const wd_factory_1 = require("../wd-factory");
const firefox_driver_creator_1 = require("./firefox-driver-creator");
const firefox_capabilities_provider_1 = require("./firefox-capabilities-provider");
const firefox_options_provider_1 = require("./firefox-options-provider");
class FirefoxDriverFactory extends wd_factory_1.WebDriverFactory {
    createDriver(browserConfig) {
        let capabilities = new firefox_capabilities_provider_1.FirefoxCapabilitiesProvider().getCapabilities(browserConfig)
            .merge(new firefox_options_provider_1.FirefoxOptionsProvider().getOptions(browserConfig));
        console.info(capabilities);
        return new firefox_driver_creator_1.FirefoxDriverCreator()
            .createDriver(capabilities);
    }
}
exports.FirefoxDriverFactory = FirefoxDriverFactory;
