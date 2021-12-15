/* eslint-disable @typescript-eslint/quotes */
import { Footer } from '../containers/footer.container'
import { Search } from '../containers/search.container'
import { Results } from '../containers/results.container'
import { baseConfig } from '../../src/config/base-config'
import { AbstractPage } from '../../src/html/abstract-page'

class GooglePage extends AbstractPage {
  static URL = `${baseConfig.envConfig.url}`

  constructor() {
    super(GooglePage.URL, 'Google')
  }

  search: Search = new Search()

  results: Results = new Results()

  footer: Footer = new Footer()

}

export default new GooglePage()