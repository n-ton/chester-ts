import fs from 'fs'
import { isNull } from 'lodash'
import DataContainer from '../data/data-container'
import IReporter from '../reporting/i-reporter'
import ReporterFactory from '../reporting/reporter-factory'

export default class FileUtils {
  private static reporter: IReporter = ReporterFactory.getReporter(
    FileUtils.name
  )

  static mkDirs(path: string): void {
    let newPath = ''
    path.split('/').forEach((value, index) => {
      if (index === 0 && value === '.') {
        newPath = '.'
      } else {
        newPath = newPath + '/' + value
      }
      if (!fs.existsSync(newPath)) {
        this.reporter.debug('Creating directory: ' + newPath)
        fs.mkdirSync(newPath)
      }
    })
  }

  static collectFiles(rootPath: string, regexp: string): void {
    fs.readdirSync(rootPath).forEach((value) => {
      const path = rootPath + '/' + value
      try {
        FileUtils.collectFiles(path, regexp)
      } catch (error) {
        const message: string = error.message
        this.reporter.debug(message)
        if (message.includes('ENOTDIR: not a directory')) {
          if (!isNull(path.match(regexp)))
            DataContainer.addToArray(DataContainer.FILES_KEY, path)
        }
      }
    })
  }

  static collectSpecs(rootPath: string): string[] {
    this.collectFiles(rootPath, '.*\\.spec\\.(js){1}')
    return DataContainer.get(DataContainer.FILES_KEY)
  }
}
