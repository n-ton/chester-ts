import { IConfig } from "./i-config";

export interface ICapsConfig extends IConfig {
    browserName: string;
    browserVersion?: string;
    options?: IOptions;
}

export const BrowserName = {
    CHROME: 'chrome',
    EDGE: 'edge',
    FIREFOX: 'firefox',
    IE: 'ie',
    SAFARI: 'safari',
  };