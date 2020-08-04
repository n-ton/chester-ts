/* eslint-disable @typescript-eslint/quotes */
import AbstractContainer from '../../src/html/containers/abstract-container'
import IInteractiveContainer from '../../src/html/containers/interfaces/i-interactive-container'
import { Result } from './result.container'

export class Results extends AbstractContainer {

  constructor(context: IInteractiveContainer) {
    super(".//*[@id='rso']", undefined, context)
  }

  result: Result = new Result(this)
}
