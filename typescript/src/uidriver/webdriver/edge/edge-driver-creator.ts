import { WebDriver, Builder, Capabilities } from 'selenium-webdriver'
import { IWebDriverCreator } from '../interfaces/i-wd-creator'
import * as edge from 'selenium-webdriver/edge'

export class EdgeDriverCreator implements IWebDriverCreator {

    createDriver(capabilities: Capabilities): WebDriver {

        return new Builder()
            .withCapabilities(capabilities)
            .build();
    }

}