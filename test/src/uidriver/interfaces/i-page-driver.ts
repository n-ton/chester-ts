interface IPageDriver {
  goToUrl(url: string): Promise<void>
  maximizeWindow(): Promise<void>
  refresh(): Promise<void>
  navigateTo(url: string): Promise<void>
  getTitle(): Promise<string>
  takePageScreenshot(): Promise<string>
  getCurrentUrl(): Promise<string>
}

export type { IPageDriver }
