"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeDriverCreator = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
class EdgeDriverCreator {
    createDriver(capabilities) {
        return new selenium_webdriver_1.Builder()
            .withCapabilities(capabilities)
            .build();
    }
}
exports.EdgeDriverCreator = EdgeDriverCreator;
