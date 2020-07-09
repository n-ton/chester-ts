import { WebDriver, Capabilities, ITimeouts } from 'selenium-webdriver';
import { error } from 'selenium-webdriver/index';
import { IDriverFactory } from "../interfaces/i-driver-factory"
import { WdPageDriver } from "./wd-page-driver"
import { WdElementDriver } from "./wd-element-driver"
import { WdWaitingDriver } from "./wd-waiting-driver"
import { ICapsConfig } from '../../config/i-caps-config';
import CliUtils from '../../utils/cli-utils';
import { config } from '../../config/config'

export abstract class WebDriverFactory implements IDriverFactory {

    private driver: WebDriver | undefined;
    private pageDriver: WdPageDriver | undefined;
    private elementDriver: WdElementDriver | undefined;
    private waitingDriver: WdWaitingDriver | undefined;
    private namedDrivers: Map<string, WebDriver> = new Map;
    private currentSession: string = "default_driver_session";
    private browserConfig: ICapsConfig = CliUtils.getBrowserConfigFromCli();

    getDriver(): WebDriver {
        if (this.driver == undefined || this.driver == null) {
            console.info(`Starting driver.`)
            this.driver = this.createDriver(this.browserConfig);
            this.namedDrivers.set(this.currentSession, this.driver);
            this.setWaitingTimeout();
        } else {
            console.info(`Getting driver.`)
        }
        return this.driver;
    }

    protected abstract createDriver(browserConfig: ICapsConfig): WebDriver;

    isDriverStarted(): boolean {
        return this.driver != null && this.driver != undefined;
    }

    async isBrowserAlive(): Promise<boolean | undefined> {
        if (this.isDriverStarted()) {
            let awh
            try {
                awh = await this.driver?.getAllWindowHandles();
            } catch (e) {
                if (e instanceof error.NoSuchSessionError) {
                    console.error(e.name + ': ' + e.message)
                } else {
                    console.error(`Unknown error ${e.name}`)
                    throw e;
                }
                awh = undefined
                this.driver = undefined
            }
            console.info(`All window handles ${awh}.`)
            return awh != undefined ? awh.length != 0 : false;
        } else {
            console.warn('Driver is not started.')
        }

    }

    async quitDriver(): Promise<void> {
        if (this.isDriverStarted()) {
            const browserName = (await this.getCapabilities())?.getBrowserName();
            const sessionId = await this.getCurrentSessionId();
            try {
                await this.driver?.quit()
            } finally {
                console.warn(`Quit current session ${sessionId}.`)
            }
            console.info(`Closing browser ${browserName}.`)
            this.driver = undefined
        } else {
            console.warn(`Driver is not started.`)
        }
    }

    async getCapabilities(): Promise<Capabilities | undefined> {
        if (this.isDriverStarted()) {
            let capabilities = await this.driver?.getCapabilities()
            return capabilities;
        } else {
            console.warn('Driver is not started.')
        }
    }

    async getCurrentWindowHandle(): Promise<string | undefined> {
        if (await this.isBrowserAlive()) {
            let currentWindowHandle = await this.driver?.getWindowHandle()
            console.info(`Current window ${currentWindowHandle}.`)
            return currentWindowHandle;
        } else {
            console.warn('Browser is not alive. There are no available windows.')
        }
    }

    async closeWindow(): Promise<void> {
        if (await this.isBrowserAlive()) {
            let currentWindowHandle = await this.getCurrentWindowHandle()
            console.info(`Closing current window ${currentWindowHandle}.`)
            await this.driver?.close();
        } else {
            console.warn('Browser is not alive. There are no available windows.')
        }
    }

    async getCurrentSessionId(): Promise<string | undefined> {
        if (this.isDriverStarted()) {
            let currentSession = await this.driver?.getSession();
            let currentSessionId = currentSession?.getId();
            console.info(`Current session ${currentSessionId}.`)
            return currentSessionId;
        } else {
            console.warn('Driver is not started.')
        }
    }

    async setWaitingTimeout(timeout: ITimeouts = {
        script: config.timeouts.implicit,
        pageLoad: config.timeouts.pageLoad,
        implicit: config.timeouts.implicit
    }): Promise<void> {
        console.info(`Setting global timeouts ${Object.entries(timeout)}`)
        await this.driver?.manage().setTimeouts(timeout);
    }

    async maximizeWindow(): Promise<void> {
        if (await this.isBrowserAlive()) {
            console.info(`Maximizing window.`);
            await this.driver?.manage().window().maximize();
        } else {
            console.warn('Browser is not alive. There are no available windows.')
        }
    }

    public getPageDriver(): WdPageDriver {
        if (this.pageDriver == null || this.pageDriver == undefined) {
            return new WdPageDriver();
        } else {
            return this.pageDriver;
        }
    }

    public getElementDriver(): WdElementDriver {
        if (this.elementDriver == null || this.elementDriver == undefined) {
            return new WdElementDriver();
        } else {
            return this.elementDriver;
        }

    }

    public getWaitingDriver(): WdWaitingDriver {
        if (this.waitingDriver == null || this.waitingDriver == undefined) {
            return new WdWaitingDriver();
        } else {
            return this.waitingDriver;
        }
    }
}