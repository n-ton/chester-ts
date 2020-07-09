"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeOptionsProvider = void 0;
const caps_config_reader_1 = require("../../../config/caps-config-reader");
const edge = require("selenium-webdriver/edge");
class EdgeOptionsProvider {
    getOptions(browserConfig) {
        let options = new caps_config_reader_1.default().readOptions(browserConfig);
        if (options == undefined) {
            return new edge.Options();
        }
        else {
            return options;
        }
    }
}
exports.EdgeOptionsProvider = EdgeOptionsProvider;
