/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { afterEach } from 'mocha'
import { FactoryProvider } from '../../src/uidriver/factory-provider'
import GooglePage from '../page_objects/google.page'
import ClickAction from '../../src/html/elements/actions/click-action'
import { Key } from 'selenium-webdriver/lib/input'

describe('Google search', () => {
  it('AC1: Search github/n-ton', async () => {

    await GooglePage.goToUrl()

    await GooglePage.search.input.changeValue('github/n-ton', Key.RETURN)

    expect(await GooglePage.results.result.link.getHref(), 'First link is github.com/n-ton')
      .to.contain('https://github.com/n-ton')

    expect(await GooglePage.results.result.link.readValue(), 'First link text contains username, name and surname')
      .to.contain('n-ton (Anton Ostrenko)')
  })

  afterEach('Quit browser', async () => {
    await FactoryProvider.getWebDriverFactory().quitDriver()
  })
})
