"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirefoxDriverCreator = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
class FirefoxDriverCreator {
    createDriver(capabilities) {
        return new selenium_webdriver_1.Builder()
            .withCapabilities(capabilities)
            .build();
    }
}
exports.FirefoxDriverCreator = FirefoxDriverCreator;
