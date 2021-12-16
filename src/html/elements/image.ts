/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriversFactory } from '../../uidriver/drivers-factory'
import HttpUtils from '../../utils/http-utils'
import { Attributes } from '../attributes'
import AbstractElementsContainer from '../containers/abstract-elements.container'

export default class Image extends AbstractElementsContainer {
  async getSrc(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(
      this,
      Attributes.SRC
    )
  }

  async getAlt(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(
      this,
      Attributes.ALT
    )
  }

  async getWidth(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(
      this,
      Attributes.WIDTH
    )
  }

  async getHeight(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(
      this,
      Attributes.HEIGHT
    )
  }

  async isDisplayed(shouldWait?: boolean): Promise<boolean> {
    return (
      (await HttpUtils.headRequest(await this.getSrc())) === 200 &&
      (await super.isDisplayed(shouldWait))
    )
  }
}
