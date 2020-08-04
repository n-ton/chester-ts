/* eslint-disable @typescript-eslint/quotes */
import AbstractContainer from '../../src/html/containers/abstract-container'
import IInteractiveContainer from '../../src/html/containers/interfaces/i-interactive-container'
import Link from '../../src/html/elements/link'
import Text from '../../src/html/elements/text'

export class Result extends AbstractContainer {

    constructor(context: IInteractiveContainer) {
        super(".//*[@href]", undefined, context)
    }

    link: Link = new Link(".", this)
    title: Text = new Text(".//h3", this)
}
