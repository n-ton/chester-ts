import { e2eConfig } from './e2e-config'
import BaseRunner from './base-runner'

class E2eRunner extends BaseRunner {
  run() {
    try {
      this.mocha.files = e2eConfig.specs.map((spec) => e2eConfig.path + spec)
      this.mocha.run((failures: number | undefined) =>
        process.on('exit', () => process.exit(failures))
      ) // exit with non-zero exit code, other wise fails will not fail mocha run
    } catch (err) {
      console.error(`Test suite doesn't exists or set. Error: ${err}`)
    }
  }
}

export default new E2eRunner().run()
