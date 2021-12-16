import IHaveUrl from './i-have-url'

export default interface IPage extends IHaveUrl {
  refresh(): Promise<void>
  getTitle(): Promise<string>
  waitUntilTitleIs(timeout?: number): Promise<boolean>
  waitUntilTitleMatches(title: RegExp, timeout?: number): Promise<boolean>
}
