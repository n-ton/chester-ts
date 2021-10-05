/* eslint-disable @typescript-eslint/quotes */

import AbstractElementsContainer from "../../src/html/containers/abstract-elements.container"
import Link from "../../src/html/elements/link"

export class Footer extends AbstractElementsContainer {
  constructor() {
    super(".//*[@id='fbar']")
    this.addElement(this.confidentiality)
  }

  confidentiality: Link = new Link(".//*[@href][text()='Конфиденциальность']", this)
}
