import { WebDriver, Capabilities, ITimeouts } from 'selenium-webdriver'
import { error } from 'selenium-webdriver'
import { isNull, isUndefined } from 'lodash'
import { IDriverFactory } from '../interfaces/i-driver-factory'
import { baseConfig } from '../../config/base-config'
import { ICapsConfig } from '../../config/driver/i-caps-config'
import { ISelenoidConfig } from '../../config/driver/selenoid/i-selenoid-config'
import { allConfigs } from '../../config/all-configs'
import ReporterFactory from '../../reporting/reporter-factory'
import IReporter from '../../reporting/i-reporter'
import { FactoryProvider } from '../factory-provider'
import { WdPageDriver } from './wd-page-driver'
import { WdElementDriver } from './wd-element-driver'
import { WdWaitingDriver } from './wd-waiting-driver'
import WdElementsDriver from './wd-elements-driver'
import { WdManager } from './wd-manager'

export abstract class WebDriverFactory implements IDriverFactory {
  protected reporter: IReporter = ReporterFactory.getReporter(
    WebDriverFactory.name
  )

  private driver: WebDriver | undefined
  private pageDriver: WdPageDriver | undefined
  private elementDriver: WdElementDriver | undefined
  private elementsDriver: WdElementsDriver | undefined
  private waitingDriver: WdWaitingDriver | undefined
  private namedDrivers: Map<string, WebDriver> = new Map()
  private currentSession: string = 'default_driver_session'
  private capsConfig: ICapsConfig = allConfigs.capsConfig
  protected selenoidConfig: ISelenoidConfig | undefined =
    allConfigs.selenoidConfig

  async getDriver(): Promise<WebDriver> {
    if (isUndefined(this.driver) || isNull(this.driver === null)) {
      this.reporter.debug('Starting driver.')
      this.driver = this.createDriver(this.capsConfig)
      await this.driver.getCapabilities().then((result) => {
        this.reporter.debug(result)
      })
      this.namedDrivers.set(this.currentSession, this.driver)
      await this.setWaitingTimeout()
    } else {
      this.reporter.debug('Getting driver.')
    }
    return this.driver
  }

  protected abstract createDriver(browserConfig: ICapsConfig): WebDriver

  isDriverStarted(): boolean {
    return !isNull(this.driver) && !isUndefined(this.driver)
  }

  async isBrowserAlive(): Promise<boolean | undefined> {
    if (this.isDriverStarted()) {
      let awh
      try {
        awh = await this.driver?.getAllWindowHandles()
      } catch (e) {
        if (e instanceof error.NoSuchSessionError) {
          this.reporter.error(e.name + ': ' + e.message)
        } else {
          this.reporter.error(`Unknown error ${e.name}`)
          throw e
        }
        awh = undefined
        this.driver = undefined
      }
      this.reporter.info('All window handles', `${awh}`)
      return !isUndefined(awh) && !!awh.length
    } else {
      this.reporter.warn('Driver is not started.')
    }
  }

  async quitDriver(context?: Mocha.Context): Promise<void> {
    if (this.isDriverStarted()) {
      const browserName = (await this.getCapabilities())?.getBrowserName()
      const sessionId = await this.getCurrentSessionId()

      if (
        context?.currentTest?.state === 'failed' ||
        baseConfig.collectArtifacts
      ) {
        try {
          let title = context?.currentTest?.title + ' ' + new Date().getTime()

          this.reporter.info('Collecting logs.')
          this.reporter.attachLogs(
            title,
            await WdManager.getAvailableLogsFormatted()
          )
          this.reporter.attachScreenshot(
            title,
            await FactoryProvider.getWebDriverFactory()
              .getPageDriver()
              .takePageScreenshot()
          )
        } catch (error) {
          this.reporter.error('Collecting logs failed', error.message)
        } finally {
          await this.driver?.quit()
          this.reporter.info('Quit current session', `${sessionId}`)
          this.reporter.info('Closing browser', `${browserName}`)
          this.driver = undefined
        }
      } else {
        await this.driver?.quit()
        this.reporter.info('Quit current session', `${sessionId}`)
        this.reporter.info('Closing browser', `${browserName}`)
        this.driver = undefined
      }
    } else {
      this.reporter.warn('Driver is not started.')
    }
  }

  async getCapabilities(): Promise<Capabilities | undefined> {
    if (this.isDriverStarted()) {
      let capabilities = await this.driver?.getCapabilities()
      return capabilities
    } else {
      this.reporter.warn('Driver is not started.')
    }
  }

  async getCurrentWindowHandle(): Promise<string | undefined> {
    if (await this.isBrowserAlive()) {
      let currentWindowHandle = await this.driver?.getWindowHandle()
      this.reporter.info('Current window', `${currentWindowHandle}`)
      return currentWindowHandle
    } else {
      this.reporter.warn(
        'Browser is not alive. There are no available windows.'
      )
    }
  }

  async closeWindow(): Promise<void> {
    if (await this.isBrowserAlive()) {
      let currentWindowHandle = await this.getCurrentWindowHandle()
      this.reporter.info('Closing current window', `${currentWindowHandle}`)
      await this.driver?.close()
    } else {
      this.reporter.warn(
        'Browser is not alive. There are no available windows.'
      )
    }
  }

  async getCurrentSessionId(): Promise<string | undefined> {
    if (this.isDriverStarted()) {
      let currentSession = await this.driver?.getSession()
      let currentSessionId = currentSession?.getId()
      this.reporter.info('Current session', `${currentSessionId}`)
      return currentSessionId
    } else {
      this.reporter.warn('Driver is not started.')
    }
  }

  async setWaitingTimeout(
    timeout: ITimeouts = {
      script: baseConfig.timeouts.script,
      pageLoad: baseConfig.timeouts.pageLoad,
      implicit: baseConfig.timeouts.implicit,
    }
  ): Promise<void> {
    this.reporter.debug('Setting global timeout', `${JSON.stringify(timeout)}`)
    await this.driver
      ?.manage()
      .setTimeouts(timeout)
      .then(() => this.reporter.debug('OK: Setting global timeout'))
      .catch((result) => console.error(result))
  }

  async getWaitingTimeout(): Promise<ITimeouts | undefined> {
    let timeout:
      | ITimeouts
      | undefined = await this.driver?.manage().getTimeouts()
    this.reporter.debug('Getting global timeout', `${JSON.stringify(timeout)}`)
    return timeout
  }

  async maximizeWindow(): Promise<void> {
    if (await this.isBrowserAlive()) {
      this.reporter.info('Maximizing window.')
      await this.driver?.manage().window().maximize()
    } else {
      this.reporter.warn(
        'Browser is not alive. There are no available windows.'
      )
    }
  }

  async sleep(amount: number): Promise<void> {
    if (this.isDriverStarted()) {
      this.reporter.info('Driver sleeping', amount)
      this.driver?.sleep(amount)
    } else {
      this.reporter.warn('Driver is not started.')
    }
  }

  public getPageDriver(): WdPageDriver {
    if (isNull(this.pageDriver) || isUndefined(this.pageDriver)) {
      return new WdPageDriver()
    } else {
      return this.pageDriver
    }
  }

  public getElementDriver(): WdElementDriver {
    if (isNull(this.elementDriver) || isUndefined(this.elementDriver)) {
      return new WdElementDriver()
    } else {
      return this.elementDriver
    }
  }

  public getElementsDriver(): WdElementsDriver {
    if (isNull(this.elementsDriver) || isUndefined(this.elementsDriver)) {
      return new WdElementsDriver()
    } else {
      return this.elementsDriver
    }
  }

  public getWaitingDriver(): WdWaitingDriver {
    if (isNull(this.waitingDriver) || isUndefined(this.waitingDriver)) {
      return new WdWaitingDriver()
    } else {
      return this.waitingDriver
    }
  }
}
