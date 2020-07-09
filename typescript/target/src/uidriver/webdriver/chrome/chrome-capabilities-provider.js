"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capabilities_1 = require("selenium-webdriver/lib/capabilities");
const caps_config_reader_1 = require("../../../config/caps-config-reader");
class ChromeCapabilitiesProvider {
    getCapabilities(browserConfig) {
        return capabilities_1.Capabilities.chrome()
            .merge(new caps_config_reader_1.default().readCapabilities(browserConfig));
    }
}
exports.default = ChromeCapabilitiesProvider;
