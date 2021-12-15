/* eslint-disable @typescript-eslint/quotes */
import AbstractElementsContainer from '../../src/html/containers/abstract-elements.container'
import { Result } from './result.container'

export class Results extends AbstractElementsContainer {

  constructor() {
    super(".//*[@id='rso']")
  }

  result: Result = new Result(this)
}
