import { IOptions } from '../../uidriver/webdriver/interfaces/i-options'

export interface ICapsConfig {
  view: View
  browserName: BrowserName
  browserVersion?: string
  pageLoadStrategy?: PageLoadStrategy
  options?: IOptions
}

export enum BrowserName {
  CHROME = 'chrome',
  EDGE = 'edge',
  IE = 'ie',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
}

export enum View {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
}

export enum PageLoadStrategy {
  NONE = 'none',
  EAGER = 'eager',
  NORMAL = 'normal',
}
