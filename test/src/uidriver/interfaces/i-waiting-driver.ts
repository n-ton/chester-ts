export interface IWaitingDriver {
  waitUntilElementIsVisible(
    element: ILocatable,
    timeout?: number
  ): Promise<void>
  waitUntilElementIsClickable(
    element: ILocatable,
    timeout?: number
  ): Promise<void>
  waitUntilTitleIs(
    title: string,
    timeout?: number,
    message?: string
  ): Promise<void>
}
