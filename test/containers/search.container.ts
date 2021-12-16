/* eslint-disable @typescript-eslint/quotes */

import AbstractElementsContainer from "../../src/html/containers/abstract-elements.container"
import Button from "../../src/html/elements/button"
import TextBox from "../../src/html/elements/textbox"

export class Search extends AbstractElementsContainer {

  constructor() {
    super(".//form[@role='search']")
    this.addElement(this.input)
    this.addElement(this.searchBtn)
  }

  input: TextBox = new TextBox(".//*[@name='q']", this)
  searchBtn: Button = new Button("(.//*[@name='btnK'])[2]", this)
}
