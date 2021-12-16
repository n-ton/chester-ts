export class DateUtils {
  static toDateFormatted(timestamp: number): string {
    const date: Date = new Date(timestamp)
    date.setMonth(date.getMonth() + 1)

    const year: number = date.getFullYear()
    const month: number = date.getUTCMonth()
    const day: number = date.getUTCDate()
    const hours: string = '0' + date.getHours()
    const mins: string = '0' + date.getMinutes()
    const sec: string = '0' + date.getSeconds()
    const millis: number = date.getMilliseconds()

    return (
      year +
      '-' +
      month +
      '-' +
      day +
      'T' +
      hours.substr(-2) +
      ':' +
      mins.substr(-2) +
      ':' +
      sec.substr(-2) +
      '.' +
      millis
    )
  }
}
