import axios from 'axios'
import IReporter from '../reporting/i-reporter'
import ReporterFactory from '../reporting/reporter-factory'

export default class HttpUtils {
  private static readonly reporter: IReporter = ReporterFactory.getReporter(
    HttpUtils.name
  )

  static async headRequest(url: string): Promise<number> {
    this.reporter.info('Requesting HEAD data', url)
    const response = await axios.head(url)
    this.reporter.info(
      'HEAD data',
      response.status,
      response.statusText,
      response.headers
    )
    return response.status
  }

  static async downloadBlob<R>(url: string): Promise<R> {
    this.reporter.info('Downloading Blob data', url)
    const response = await axios.get(url, { responseType: 'blob' })
    this.reporter.info(
      'Blob data',
      response.status,
      response.statusText,
      response.headers
    )
    return response.data
  }
}
