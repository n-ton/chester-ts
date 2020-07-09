"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeDriverFactory = void 0;
const wd_factory_1 = require("../wd-factory");
const edge_driver_creator_1 = require("./edge-driver-creator");
const edge_capabilities_provider_1 = require("./edge-capabilities-provider");
const edge_options_provider_1 = require("./edge-options-provider");
class EdgeDriverFactory extends wd_factory_1.WebDriverFactory {
    createDriver(browserConfig) {
        let capabilities = new edge_capabilities_provider_1.EdgeCapabilitiesProvider().getCapabilities(browserConfig)
            .merge(new edge_options_provider_1.EdgeOptionsProvider().getOptions(browserConfig));
        console.info(capabilities);
        return new edge_driver_creator_1.EdgeDriverCreator()
            .createDriver(capabilities);
    }
}
exports.EdgeDriverFactory = EdgeDriverFactory;
