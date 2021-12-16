export default interface IHaveUrl {
  getCurrentUrl(): Promise<string>
  goToUrl(url?: string): Promise<void>
  waitUntilUrlContains(entry: string, timeout?: number): Promise<boolean>
  waitUntilUrlIs(url: string, timeout?: number): Promise<boolean>
}
