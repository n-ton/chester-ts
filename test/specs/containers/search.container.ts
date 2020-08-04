/* eslint-disable @typescript-eslint/quotes */
import AbstractContainer from '../../src/html/containers/abstract-container'
import IInteractiveContainer from '../../src/html/containers/interfaces/i-interactive-container'
import TextBox from '../../src/html/elements/textbox'
import Button from '../../src/html/elements/button'

export class Search extends AbstractContainer {

  constructor(context: IInteractiveContainer) {
    super(".//form[@role='search']", undefined, context)
    this.addElement(this.input)
    this.addElement(this.searchBtn)
  }

  input: TextBox = new TextBox(".//*[@name='q']", this)
  searchBtn: Button = new Button("(.//*[@name='btnK'])[2]", this)
}
