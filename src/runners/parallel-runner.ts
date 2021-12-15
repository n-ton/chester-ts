import concurrently from 'concurrently'
import { isUndefined } from 'lodash'
import { allConfigs } from '../config/all-configs'
import CliUtils from '../utils/cli-utils'
import FileUtils from '../utils/file-utils'
import IRunner from './i-runner'

class ParallelRunner implements IRunner {
  run(): void {
    const params: string[] = Array.from(allConfigs.allParams.entries()).map(
      (entry) => entry[0] + ' ' + entry[1]
    )

    const command: string =
      `node ${allConfigs.outDir}/src/runners/sequential-runner.js ` +
      params.join(' ')

    let specs: string[]
    let commands: string[]

    if (isUndefined(allConfigs.specsConfig)) {
      specs = FileUtils.collectSpecs(allConfigs.specsDir())
    } else {
      specs = allConfigs.specsConfig.specs.map(
        (spec) => allConfigs.specsConfig?.path + spec
      )
    }

    commands = specs.map(
      (spec) => command + ' --' + CliUtils.SPEC_FILE_PARAM + ' ' + spec
    )

    concurrently(commands, { prefix: 'pid', maxProcesses: 15, restartTries: 1 })
      .then(function onSuccess() {
        process.exit(0)
      })
      .catch(function onFailure() {
        process.exit(1)
      })
  }
}

export default new ParallelRunner().run()
