import { acceptanceConfig } from './acceptance-config'
import BaseRunner from './base-runner'

class AcceptanceRunner extends BaseRunner {
  run() {
    try {
      this.mocha.files = acceptanceConfig.specs.map(
        (spec) => acceptanceConfig.path + spec
      )
      this.mocha.run((failures: number | undefined) =>
        process.on('exit', async () => {
          process.exit(failures)
        })
      ) // exit with non-zero exit code, other wise fails will not fail mocha run
    } catch (err) {
      console.error(`Test suite doesn't exists or set. Error: ${err}`)
    }
  }
}

export default new AcceptanceRunner().run()
