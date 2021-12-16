import { WebDriver } from 'selenium-webdriver'
import { allConfigs } from '../config/all-configs'
import { IDriverManager } from './interfaces/i-driver-manager'
import { IElementDriver } from './interfaces/i-element-driver'
import { IPageDriver } from './interfaces/i-page-driver'
import { IWaitDriver } from './interfaces/i-wait-driver'
import { WdFactoryProvider } from './webdriver/wd-factory-provider'

export class DriversFactory {
  private static PAGE_DRIVER: IPageDriver = DriversFactory.initPageDriver()
  private static ELEMENT_DRIVER: IElementDriver = DriversFactory.initElementDriver()
  private static WAIT_DRIVER: IWaitDriver = DriversFactory.initWaitDriver()
  private static WD_MANAGER: IDriverManager = DriversFactory.initDriverManager()

  private static initPageDriver(): IPageDriver {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return WdFactoryProvider.webDriverFactory().getPageDriver()
      }
      default: {
        throw new Error(
          `There is no page driver impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  private static initElementDriver(): IElementDriver {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return WdFactoryProvider.webDriverFactory().getElementDriver()
      }
      default: {
        throw new Error(
          `There is no page driver impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  private static initWaitDriver(): IWaitDriver {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return WdFactoryProvider.webDriverFactory().getWaitDriver()
      }
      default: {
        throw new Error(
          `There is no page driver impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  private static initDriverManager(): IDriverManager {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return WdFactoryProvider.webDriverFactory().getDriverManager()
      }
      default: {
        throw new Error(
          `There is no driver manager impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  static pageDriver(): IPageDriver {
    return DriversFactory.PAGE_DRIVER
  }

  static elementDriver(): IElementDriver {
    return DriversFactory.ELEMENT_DRIVER
  }

  static waitDriver(): IWaitDriver {
    return DriversFactory.WAIT_DRIVER
  }

  static driverManager(): IDriverManager {
    return DriversFactory.WD_MANAGER
  }

  static async driver(): Promise<WebDriver> {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return await WdFactoryProvider.webDriverFactory().getDriver()
      }
      default: {
        throw new Error(`There is no driver impl for '${allConfigs.driver()}'`)
      }
    }
  }

  static async quitDriver(context: Mocha.Context): Promise<void> {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return await WdFactoryProvider.webDriverFactory().quitDriver(context)
      }
      default: {
        throw new Error(
          `There is no quit driver impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  static async sleep(timeout: number): Promise<void> {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return await WdFactoryProvider.webDriverFactory().sleep(timeout)
      }
      default: {
        throw new Error(
          `There is no quit driver impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  static async getCurrentWindowHandle(): Promise<string | undefined> {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return await WdFactoryProvider.webDriverFactory().getCurrentWindowHandle()
      }
      default: {
        throw new Error(
          `There is no getCurrentWindowHandle impl for '${allConfigs.driver()}'`
        )
      }
    }
  }

  static async getAllWindowHandles(): Promise<string[]> {
    switch (allConfigs.driver()) {
      case 'webdriver': {
        return await WdFactoryProvider.webDriverFactory().getAllWindowHandles()
      }
      default: {
        throw new Error(
          `There is no getAllWindowHandles() impl for '${allConfigs.driver()}'`
        )
      }
    }
  }
}
