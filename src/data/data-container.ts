import { isUndefined } from 'lodash'
import IReporter from '../reporting/i-reporter'
import ReporterFactory from '../reporting/reporter-factory'

export default class DataContainer {
  private static reporter: IReporter = ReporterFactory.getReporter(
    DataContainer.name
  )

  private static items: Map<string, any> = new Map<string, any>()

  public static FILES_KEY = 'FILES'

  private static set(key: string, item: any): void {
    DataContainer.items.set(key, item)
  }

  public static add(key: string, item: any): void {
    DataContainer.set(key, item)
  }

  public static addToArray(key: string, item: any): void {
    if (DataContainer.items.has(key)) {
      let value = DataContainer.items.get(key)
      if (Array.isArray(value)) {
        value.push(item)
        DataContainer.set(key, value)
      } else {
        this.reporter.warn(
          `Item with key=${key} is not an Array, but ` + typeof value
        )
      }
    } else {
      let array: Array<any> = new Array<any>()
      array.push(item)
      DataContainer.set(key, array)
    }
  }

  public static addToMap(key: string, item: any): void {
    if (DataContainer.items.has(key)) {
      let value = DataContainer.items.get(key)
      if (value instanceof Map) {
        item = item as { key: string; value: string }
        value.set(item.key, item.value)
        DataContainer.set(key, value)
      } else {
        this.reporter.warn(
          `Item with key=${key} is not a Map, but ` + typeof value
        )
      }
    } else {
      let map: Map<string, any> = new Map<string, any>()
      map.set(item.key, item.value)
      DataContainer.set(key, map)
    }
  }

  public static get(key: string): any {
    let value = DataContainer.items.get(key)
    if (isUndefined(value)) {
      this.reporter.warn(`There is no item for key=${key} in DataContainer`)
    }

    return value
  }

  public static clear(): void {
    DataContainer.items.clear()
  }

  public static printMap(): string {
    const itemsAsString = Object.getOwnPropertyNames(DataContainer.items)
      .map((key) => `'${key}': ${this.get(key)}`)
      .join(', ')
    return `{ ${itemsAsString} }`
  }
}
