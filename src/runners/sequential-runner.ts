import { isUndefined } from 'lodash'
import Mocha from 'mocha'
import { allConfigs } from '../config/all-configs'
import { MochaOptions } from '../config/mocha/mocha-options'
import FileUtils from '../utils/file-utils'
import { AllureReporter } from '../reporting/allure-reporter'
import { Reporters } from '../config/mocha/reporting/reporter-config'
import IRunner from './i-runner'
import ReporterFactory from '../reporting/reporter-factory'

export class SequentialRunner implements IRunner {
  private mocha: Mocha = new Mocha(MochaOptions)

  run(): void {
    try {
      if (allConfigs.env?.startsWith('ci')) this.mocha.forbidOnly()

      this.mocha.slow(30000)

      const specFile: string = allConfigs.specFile()
      if (specFile !== 'undefined') {
        this.mocha.files = new Array<string>(specFile)
      } else if (!isUndefined(allConfigs.specsConfig)) {
        this.mocha.files = allConfigs.specsConfig?.specs.map(
          (spec) => allConfigs.specsConfig?.path + spec
        )
      } else {
        const sd: string = allConfigs.specsDir()
        ReporterFactory.getReporter(SequentialRunner.name).info(`Looking for spec files in default specsDir '${sd}'`)
        this.mocha.files = FileUtils.collectSpecs(sd)
      }

      ReporterFactory.getReporter(SequentialRunner.name).info(`Run spec files: ${this.mocha.files}`)

      if (allConfigs.regexp().length !== 0) {
        let regex = new RegExp(allConfigs.regexp().replace(/,/g, '|'), 'i')
        this.mocha.grep(regex)
      }
      this.mocha.run((failures: number | undefined) =>
        process.on('exit', async () => {
          process.exit(failures)
        })
      ) // exit with non-zero exit code, otherwise fails will not fail mocha run
    } catch (err) {
      console.error(
        `Exception was thrown in ${SequentialRunner.name}`,
        `${err}`
      )
      process.exit(1)
    }
    if (allConfigs.reporterConfig.reporter === Reporters.ALLURE)
      new AllureReporter(SequentialRunner.name).populateEnvironmentProperties()
  }
}

export default new SequentialRunner().run()
