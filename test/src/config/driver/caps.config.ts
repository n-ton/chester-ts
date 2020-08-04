import { iphone_x } from '../../uidriver/webdriver/chrome/capabilities/iphone_x'
import { iphone_5 } from '../../uidriver/webdriver/chrome/capabilities/iphone_5'
import { ipad } from '../../uidriver/webdriver/chrome/capabilities/ipad'

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
    },
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
      mobileEmulation: iphone_x.deviceName,
    },
  },
  chrome_iphone5: {
    browserName: 'chrome',
    browserVersion: '83',
    pageLoadStrategy: 'EAGER',
    options: {
      mobileEmulation: iphone_5.deviceName,
    },
  },
  chrome_ipad: {
    browserName: 'chrome',
    browserVersion: '83',
    options: {
      mobileEmulation: ipad.deviceName,
    },
  },
  edge: {
    browserName: 'edge',
    options: {
      edgeChromium: true,
    },
  },
  firefox: {
    browserName: 'firefox',
    browserVersion: '78',
    options: {},
  },
  safari: {
    browserName: 'safari',
  },
}
