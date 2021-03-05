import { iphone_x } from '../../uidriver/webdriver/chrome/capabilities/iphone_x'
import { iphone_5 } from '../../uidriver/webdriver/chrome/capabilities/iphone_5'
import { ipad } from '../../uidriver/webdriver/chrome/capabilities/ipad'
import { iphone_6 } from '../../uidriver/webdriver/chrome/capabilities/iphone_6'
import { desktop } from '../../uidriver/webdriver/chrome/capabilities/desktop'
import { BrowserName, PageLoadStrategy, View } from './i-caps-config'

const browserVersions = {
  chrome: '89.0',
  edge: '87.0',
  firefox: '84.0',
  safari: undefined,
}

export const capsConfig = {
  chrome: {
    view: View.DESKTOP,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      arguments: ['user-data-dir=\\src\\config\\profiles'],
      headless: false,
      windowSize: desktop,
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
  iphone_5: {
    view: View.MOBILE,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    pageLoadStrategy: PageLoadStrategy.EAGER,
    options: {
      mobileEmulation: iphone_5,
    },
  },
  iphone_6: {
    view: View.MOBILE,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    pageLoadStrategy: PageLoadStrategy.EAGER,
    options: {
      mobileEmulation: iphone_6,
    },
  },
  iphone_X: {
    view: View.MOBILE,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      mobileEmulation: iphone_x,
    },
  },
  ipad: {
    view: View.TABLET,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      mobileEmulation: ipad,
    },
  },
  edge: {
    view: View.DESKTOP,
    browserName: BrowserName.EDGE,
    browserVersion: browserVersions.edge,
    options: {
      edgeChromium: true,
      windowSize: desktop,
    },
  },
  firefox: {
    view: View.DESKTOP,
    browserName: BrowserName.FIREFOX,
    browserVersion: browserVersions.firefox,
    options: {
      windowSize: desktop,
    },
  },
  safari: {
    view: View.DESKTOP,
    browserName: BrowserName.SAFARI,
    browserVersion: browserVersions.safari,
    options: {},
  },
}
