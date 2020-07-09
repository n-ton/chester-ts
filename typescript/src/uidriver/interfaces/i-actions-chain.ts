interface IActionsChain {

    contextClick(element: ILocatable): Promise<IActionsChain>
    clear(): Promise<IActionsChain>
    click(element: ILocatable): Promise<IActionsChain>
    keyUp(key: string): IActionsChain
    keyDown(key: string): IActionsChain
    perform(): Promise<IActionsChain>
    press(element: ILocatable): Promise<IActionsChain>

}