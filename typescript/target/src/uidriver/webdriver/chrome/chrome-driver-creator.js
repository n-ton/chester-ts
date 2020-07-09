"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeDriverCreator = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver_1 = require("chromedriver");
const driver_config_1 = require("../../../config/driver.config");
class ChromeDriverCreator {
    createDriver(capabilities) {
        let service = new chrome.ServiceBuilder(chromedriver_1.path)
            .loggingTo('typescript\\log\\chrome.log')
            .enableVerboseLogging();
        let webDriver = new selenium_webdriver_1.Builder()
            .setChromeService(service)
            .withCapabilities(capabilities)
            .build();
        if (driver_config_1.driverConfig.chrome.maximize)
            webDriver.manage().window().maximize();
        return webDriver;
    }
}
exports.ChromeDriverCreator = ChromeDriverCreator;
