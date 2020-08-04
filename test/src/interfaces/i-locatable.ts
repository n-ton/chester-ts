interface ILocatable {
  getLocator(): string | undefined
  setLocator(locator: string): void

  useContextLookup(): boolean
  setContextLookup(contextLookup: boolean): void

  getContext(): ILocatable | undefined
  setContext(context: ILocatable): void
  getLookupContext(useContextLookup: boolean): Array<ILocatable>
  getLocatableContext(): string
  getLoggableContext(): string

  getLoggableName(): string

  getName(): string
  setName(name: string): void
}
