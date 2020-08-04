import Mocha from 'mocha'
import { MochaConfig } from '../config/mocha/mocha-config'

export default class BaseRunner {
  protected mocha = new Mocha(MochaConfig)
}
