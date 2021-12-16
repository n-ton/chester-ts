export interface ISelenoidConfig {
  url: string
  port: string
  path: string
  enableVNC?: boolean
  enableVideo?: boolean
  enableLog?: boolean
  screenResolution?: string
  maxInstances?: number
  applicationContainers?: string[]
  videoCodec?: string
}
