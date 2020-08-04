export interface IOptions {
  arguments?: string[]
  headless?: boolean
  windowSize?: {}
  excludedSwitches?: string[]
  extensions?: any[]
  chromeBinaryPath?: string
  detachDriver?: boolean
  userPreferences?: any
  perfLoggingPrefs?: {}
  localState?: any
  chromeLogFile?: string
  chromeMinidumpPath?: string
  mobileEmulation?: string
  edgeChromium?: boolean
}
