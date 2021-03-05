export default class StringUtils {
  static sanitize(s: string): string {
    const pattern: RegExp = new RegExp('\\W')
    const locators: string[] = s.split(pattern)
    return locators
      .filter((element) => {
        return element !== ''
      })
      .join('_')
      .toLocaleLowerCase()
  }
}
