import { ipad } from "../uidriver/webdriver/chrome/capabilities/ipad";
import { iphone_x } from "../uidriver/webdriver/chrome/capabilities/iphone_x";

export const capsConfig = {
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
            mobileEmulation: ipad.deviceName
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
            mobileEmulation: iphone_x.deviceName
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

}