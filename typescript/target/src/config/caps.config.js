"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capsConfig = void 0;
const ipad_1 = require("../uidriver/webdriver/chrome/capabilities/ipad");
const iphone_x_1 = require("../uidriver/webdriver/chrome/capabilities/iphone_x");
exports.capsConfig = {
    chrome: {
        browserName: 'chrome',
        browserVersion: '83',
        options: {
            arguments: ['user-data-dir=\\src\\config\\profiles'],
            headless: false,
            windowSize: {},
            excludedSwitches: [],
            extensions: [],
            chromeBinaryPath: 'path/to/binary/file',
            detachDriver: false,
            userPreferences: 'path/to/preferences/file',
            perfLoggingPrefs: {},
            localState: 'path/to/preferences/file',
            chromeLogFile: 'path/to/log/file',
            chromeMinidumpPath: 'path',
            mobileEmulation: ipad_1.ipad.deviceName
        }
    },
    chrome_headless: {
        browserName: 'chrome',
        browserVersion: '83',
        options: {
            arguments: ['user-data-dir=\\src\\config\\profiles'],
            headless: true,
            windowSize: {},
            excludedSwitches: [],
            extensions: [],
            chromeBinaryPath: '',
            detachDriver: false,
            userPreferences: 'path/to/preferences/file',
            perfLoggingPrefs: {},
            localState: 'path/to/preferences/file',
            chromeLogFile: 'path/to/log/file',
            chromeMinidumpPath: 'path',
            mobileEmulation: iphone_x_1.iphone_x.deviceName
        }
    },
    edge: {
        browserName: 'edge',
        options: {
            edgeChromium: true,
        }
    },
    firefox: {
        browserName: 'firefox',
        options: {}
    },
    safari: {
        browserName: 'safari',
    }
};
