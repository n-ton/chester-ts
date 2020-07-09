"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_reader_1 = require("./config-reader");
const capabilities_1 = require("selenium-webdriver/lib/capabilities");
const chrome = require("selenium-webdriver/chrome");
const edge = require("selenium-webdriver/edge");
const i_caps_config_1 = require("./i-caps-config");
class CapsConfigReader extends config_reader_1.default {
    readCapabilities(config) {
        let capabilities = new capabilities_1.Capabilities();
        switch (config.browserName) {
            case i_caps_config_1.BrowserName.CHROME: {
                capabilities.setBrowserName(capabilities_1.Browser.CHROME);
                break;
            }
            case i_caps_config_1.BrowserName.EDGE: {
                capabilities.setBrowserName(capabilities_1.Browser.EDGE);
                break;
            }
            case i_caps_config_1.BrowserName.FIREFOX: {
                capabilities.setBrowserName(capabilities_1.Browser.FIREFOX);
                break;
            }
            case i_caps_config_1.BrowserName.IE: {
                capabilities.setBrowserName(capabilities_1.Browser.IE);
                break;
            }
            case i_caps_config_1.BrowserName.SAFARI: {
                capabilities.setBrowserName(capabilities_1.Browser.SAFARI);
                break;
            }
        }
        if (config.browserVersion) {
            capabilities.setBrowserVersion(config.browserVersion);
        }
        return capabilities;
    }
    readOptions(config) {
        if (config.options != undefined) {
            let iOptions = config.options;
            switch (config.browserName) {
                case i_caps_config_1.BrowserName.CHROME: {
                    let options = new chrome.Options();
                    iOptions.headless ? options = options.headless() : options;
                    iOptions.mobileEmulation != undefined ? options.setMobileEmulation({ deviceName: iOptions.mobileEmulation }) : options;
                    return options;
                }
                case i_caps_config_1.BrowserName.EDGE: {
                    let options = new edge.Options();
                    options.set('ms:edgeChromium', iOptions.edgeChromium);
                    return options;
                }
                default: {
                    throw new Error(`No options for the following browserName ${config.browserName}`);
                }
            }
        }
    }
}
exports.default = CapsConfigReader;
