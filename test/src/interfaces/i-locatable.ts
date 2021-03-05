export interface ILocatable {
  getLocator(): string | undefined
  getFullLocator(): string
  setLocator(locator: string): void

  useContextLookup(): boolean
  setContextLookup(contextLookup: boolean): void

  getContext(): ILocatable | undefined
  setContext(context: ILocatable): void
  getLookupContext(): Array<ILocatable> | undefined
  getLocatableContext(): string
  getLoggableContext(): string

  getLoggableName(): string

  getName(): string
  setName(name: string): void
}
