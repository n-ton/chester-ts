import { isUndefined } from 'lodash'

export default class UrlUtils {
  static mapToParams(map: Map<string, string | undefined>): string {
    let params: string = ''
    map.forEach((value, key) => {
      if (!isUndefined(value)) params = params + `${key}=${value}&`
    })

    return params
  }

  static extractParams(url: string): string[] {
    return url.split(/\?/g)[1].split(/&/g)
  }

  static trimUrlPath(url: string): string {
    let slashIndex: number
    let i: number = 0
    let position = 0
    do {
      slashIndex = url.indexOf('/', position)
      if (slashIndex === -1) {
        return url
      }
      position = slashIndex + 1
      i++
    } while (i < 3)

    return url.substring(0, slashIndex)
  }

  static isHttp(url?: string): boolean {
    return isUndefined(url) ? false : url.startsWith('http')
  }
}
