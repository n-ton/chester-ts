"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeDriverFactory = void 0;
const wd_factory_1 = require("../wd-factory");
const chrome_driver_creator_1 = require("./chrome-driver-creator");
const chrome_capabilities_provider_1 = require("./chrome-capabilities-provider");
const chrome_options_provider_1 = require("./chrome-options-provider");
class ChromeDriverFactory extends wd_factory_1.WebDriverFactory {
    createDriver(browserConfig) {
        let capabilities = new chrome_capabilities_provider_1.default().getCapabilities(browserConfig)
            .merge(new chrome_options_provider_1.default().getOptions(browserConfig));
        console.info(capabilities);
        return new chrome_driver_creator_1.ChromeDriverCreator()
            .createDriver(capabilities);
    }
}
exports.ChromeDriverFactory = ChromeDriverFactory;
