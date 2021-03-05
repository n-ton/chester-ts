export interface IOptions {
  arguments?: string[]
  headless?: boolean
  windowSize?: { width: number; height: number }
  excludedSwitches?: string[]
  extensions?: any[]
  chromeBinaryPath?: string
  detachDriver?: boolean
  userPreferences?: any
  perfLoggingPrefs?: {}
  localState?: any
  chromeLogFile?: string
  chromeMinidumpPath?: string
  mobileEmulation?:
    | { deviceName: string }
    | { width: number; height: number; pixelRatio?: number }
  edgeChromium?: boolean
}
