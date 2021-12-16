/* eslint-disable @typescript-eslint/no-unused-vars */
import AbstractElementsContainer from '../containers/abstract-elements.container'

export default class Svg extends AbstractElementsContainer {
  async getX(): Promise<string> {
    return await this.getAttributeValue('x')
  }

  async getY(): Promise<string> {
    return await this.getAttributeValue('y')
  }

  async getViewBox(): Promise<string> {
    return await this.getAttributeValue('viewBox')
  }
}
