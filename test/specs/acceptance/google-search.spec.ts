/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { afterEach } from 'mocha'
import GooglePage from '../../page_objects/google.page'
import { Key } from 'selenium-webdriver/lib/input'
import { DriversFactory } from '../../../src/uidriver/drivers-factory'

describe('Google search - @ci', () => {
  it('AC1: Search github/n-ton', async () => {

    await GooglePage.goToUrl()

    await GooglePage.search.input.changeValue('github/n-ton', Key.RETURN)

    expect(await GooglePage.results.result.link.getHref(), 'First link is github.com/n-ton')
      .to.contain('https://github.com/n-ton')

    expect(await GooglePage.results.result.link.readValue(), 'First link text contains username, name and surname')
      .to.contain('n-ton')
  })

  afterEach('Quit browser', async function () {
    await DriversFactory.quitDriver(this)
  })
})
