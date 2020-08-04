import { isUndefined } from 'util'
import { FactoryProvider } from '../../uidriver/factory-provider'
import { baseConfig } from '../../config/base-config'
import AbstractContainer from './abstract-container'

export abstract class AbstractPage extends AbstractContainer {
  constructor(url: string) {
    super(undefined, url, undefined, undefined, undefined)
  }

  async goToUrl(url?: string): Promise<void> {
    if (isUndefined(url)) {
      if (this.getUrl()?.startsWith('http')) {
        url = this.getUrl()
      } else {
        url = `${baseConfig.baseUrl}` + this.getUrl()
      }
    }

    if (!isUndefined(url))
      await FactoryProvider.getWebDriverFactory().getPageDriver().goToUrl(url)
  }

  async refresh() {
    await FactoryProvider.getWebDriverFactory().getPageDriver().refresh()
  }
}
