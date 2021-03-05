import { ILocatable } from '../../interfaces/i-locatable'

export interface ISelectElementDriver {
  selectByIndex(element: ILocatable, index: number): Promise<void>
  selectByValue(element: ILocatable, value: string): Promise<void>
  selectByVisibleText(element: ILocatable, text: string): Promise<void>
  deselectAll(element: ILocatable): Promise<void>
}
