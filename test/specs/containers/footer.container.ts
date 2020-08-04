/* eslint-disable @typescript-eslint/quotes */
import AbstractContainer from '../../src/html/containers/abstract-container'
import IInteractiveContainer from '../../src/html/containers/interfaces/i-interactive-container'
import Link from '../../src/html/elements/link'

export class Footer extends AbstractContainer {
  constructor(context: IInteractiveContainer) {
    super(".//*[@id='fbar']", undefined, context)
    this.addElement(this.confidentiality)
  }

  confidentiality: Link = new Link(".//*[@href][text()='Конфиденциальность']", this)
}
