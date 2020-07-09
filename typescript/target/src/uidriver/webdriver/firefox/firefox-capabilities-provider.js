"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirefoxCapabilitiesProvider = void 0;
const caps_config_reader_1 = require("../../../config/caps-config-reader");
const capabilities_1 = require("selenium-webdriver/lib/capabilities");
class FirefoxCapabilitiesProvider {
    getCapabilities(browserConfig) {
        return capabilities_1.Capabilities.firefox()
            .merge(new caps_config_reader_1.default().readCapabilities(browserConfig));
    }
}
exports.FirefoxCapabilitiesProvider = FirefoxCapabilitiesProvider;
