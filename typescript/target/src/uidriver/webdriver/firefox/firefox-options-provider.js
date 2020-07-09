"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirefoxOptionsProvider = void 0;
const caps_config_reader_1 = require("../../../config/caps-config-reader");
const firefox = require("selenium-webdriver/firefox");
class FirefoxOptionsProvider {
    getOptions(browserConfig) {
        let options = new caps_config_reader_1.default().readOptions(browserConfig);
        if (options == undefined) {
            return new firefox.Options();
        }
        else {
            return options;
        }
    }
}
exports.FirefoxOptionsProvider = FirefoxOptionsProvider;
