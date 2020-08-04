/* eslint-disable @typescript-eslint/quotes */
import { AbstractPage } from '../../src/html/containers/abstract-page'
import Link from '../../src/html/elements/link'
import { Footer } from '../containers/footer.container'
import { Search } from '../containers/search.container'
import { Results } from '../containers/results.container'

class GooglePage extends AbstractPage {

  search: Search = new Search(this)

  results: Results = new Results(this)

  footer: Footer = new Footer(this)

}

export default new GooglePage('/')