"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeCapabilitiesProvider = void 0;
const caps_config_reader_1 = require("../../../config/caps-config-reader");
const capabilities_1 = require("selenium-webdriver/lib/capabilities");
class EdgeCapabilitiesProvider {
    getCapabilities(browserConfig) {
        return capabilities_1.Capabilities.edge()
            .merge(new caps_config_reader_1.default().readCapabilities(browserConfig));
    }
}
exports.EdgeCapabilitiesProvider = EdgeCapabilitiesProvider;
