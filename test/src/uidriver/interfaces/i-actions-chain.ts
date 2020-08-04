interface IActionsChain {
  contextClick(element: ILocatable): Promise<IActionsChain>
  clear(): Promise<IActionsChain>
  click(element: ILocatable): Promise<IActionsChain>
  keyUp(key: string): Promise<IActionsChain>
  keyDown(key: string): Promise<IActionsChain>
  perform(): Promise<void>
  press(element: ILocatable): Promise<IActionsChain>
  release(): Promise<IActionsChain>
  pause(duration: number): Promise<IActionsChain>
}
