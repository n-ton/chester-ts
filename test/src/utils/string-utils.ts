export default class StringUtils {
  static locatorToId(locator: string): string {
    let pattern: RegExp = new RegExp('\\W')
    let locators: string[] = locator.split(pattern)
    return locators
      .filter((element) => {
        return element !== ''
      })
      .join('_')
  }
}
