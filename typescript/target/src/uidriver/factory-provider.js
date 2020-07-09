"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryProvider = void 0;
const chrome_driver_factory_1 = require("./webdriver/chrome/chrome-driver-factory");
const firefox_driver_factory_1 = require("./webdriver/firefox/firefox-driver-factory");
const edge_driver_factory_1 = require("./webdriver/edge/edge-driver-factory");
const cli_utils_1 = require("../utils/cli-utils");
class FactoryProvider {
    static initWebDriverFactory() {
        const browserConfig = cli_utils_1.default.getBrowserConfigFromCli();
        switch (browserConfig.browserName) {
            case "chrome": {
                return new chrome_driver_factory_1.ChromeDriverFactory();
            }
            case "firefox": {
                return new firefox_driver_factory_1.FirefoxDriverFactory();
            }
            case "edge": {
                return new edge_driver_factory_1.EdgeDriverFactory();
            }
            default: {
                throw new Error(`There is no driver for browser configuration '${browserConfig}'`);
            }
        }
    }
    static getWebDriverFactory() {
        return FactoryProvider.FACTORY;
    }
}
exports.FactoryProvider = FactoryProvider;
FactoryProvider.FACTORY = FactoryProvider.initWebDriverFactory();
