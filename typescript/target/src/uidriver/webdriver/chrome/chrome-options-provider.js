"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chrome = require("selenium-webdriver/chrome");
const caps_config_reader_1 = require("../../../config/caps-config-reader");
class ChromeOptionsProvider {
    getOptions(browserConfig) {
        let options = new caps_config_reader_1.default().readOptions(browserConfig);
        if (options == undefined) {
            return new chrome.Options();
        }
        else {
            return options;
        }
    }
}
exports.default = ChromeOptionsProvider;
