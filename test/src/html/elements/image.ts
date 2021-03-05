/* eslint-disable @typescript-eslint/no-unused-vars */
import { FactoryProvider } from '../../uidriver/factory-provider'
import { Attributes } from '../attributes'
import AbstractElement from './abstract-element'

export default class Image extends AbstractElement {
  async getSrc(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, Attributes.SRC)
  }

  async getAlt(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, Attributes.ALT)
  }

  async getWidth(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, Attributes.WIDTH)
  }

  async getHeight(): Promise<string> {
    return await FactoryProvider.getWebDriverFactory()
      .getElementDriver()
      .getAttributeValue(this, Attributes.HEIGHT)
  }
}
