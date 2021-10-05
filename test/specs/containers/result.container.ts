/* eslint-disable @typescript-eslint/quotes */

import AbstractElementsContainer from "../../src/html/containers/abstract-elements.container"
import Link from "../../src/html/elements/link"
import Text from "../../src/html/elements/text"

export class Result extends AbstractElementsContainer {

    constructor(context: AbstractElementsContainer) {
        super(".//*[@href]", context)
    }

    link: Link = new Link(".", this)
    title: Text = new Text(".//h3", this)
}
