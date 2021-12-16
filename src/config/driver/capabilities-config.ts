import { iphone_x } from '../../uidriver/webdriver/chrome/emulation/iphone_x'
import { iphone_5 } from '../../uidriver/webdriver/chrome/emulation/iphone_5'
import { ipad } from '../../uidriver/webdriver/chrome/emulation/ipad'
import { iphone_6 } from '../../uidriver/webdriver/chrome/emulation/iphone_6'
import { desktop } from '../../uidriver/webdriver/chrome/emulation/desktop'
import { desktop_1024px } from '../../uidriver/webdriver/chrome/emulation/desktop_1024px'
import { BrowserName, View } from './i-capabilities-config'

const browserVersions = {
  chrome: '91.0',
  edge: '90.0',
  firefox: '89.0',
  safari: undefined,
}

export const capsConfig = {
  chrome: {
    view: View.DESKTOP,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      // arguments: ['user-data-dir=\\src\\config\\profiles'],
      windowSize: desktop,
      // excludedSwitches: [],
      // extensions: [],
      // chromeBinaryPath: 'path/to/binary/file',
      // detachDriver: false,
      // userPreferences: 'path/to/preferences/file',
      // perfLoggingPrefs: {},
      // localState: 'path/to/preferences/file',
      // chromeLogFile: 'path/to/log/file',
      // chromeMinidumpPath: 'path',
    },
  },
  chrome_head: {
    view: View.DESKTOP,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      headless: false,
      windowSize: desktop,
    },
  },
  chrome_1024_head: {
    view: View.DESKTOP,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      headless: false,
      windowSize: desktop_1024px,
      maximize: false,
    },
  },
  iphone_5: {
    view: View.MOBILE,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
    options: {
      mobileEmulation: iphone_5,
    },
  },
  iphone_6: {
    view: View.MOBILE,
    browserName: BrowserName.CHROME,
    browserVersion: browserVersions.chrome,
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
      headless: false,
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
