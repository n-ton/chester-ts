export interface IWaitingDriver {

    waitUntilElementIsVisible(element: ILocatable, timeout?: number): void;
    waitUntilElementIsClickable(element: ILocatable, timeout?: number): void;
    waitUntilTitleIs(title: string, timeout?: number, message?: string): void;
}