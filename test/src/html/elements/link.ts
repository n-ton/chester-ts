/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriversFactory } from '../../uidriver/drivers-factory'
import AbstractElementsContainer from '../containers/abstract-elements.container'

export default class Link extends AbstractElementsContainer {
  async getHref(): Promise<string> {
    return await DriversFactory.elementDriver().getAttributeValue(this, 'href')
  }
}
