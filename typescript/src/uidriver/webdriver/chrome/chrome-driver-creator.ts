import { WebDriver, Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver';
import { IWebDriverCreator } from '../interfaces/i-wd-creator';
import * as chrome from 'selenium-webdriver/chrome';
import { path } from 'chromedriver';
import { driverConfig } from '../../../config/driver.config';

export class ChromeDriverCreator implements IWebDriverCreator {

    createDriver(capabilities: Capabilities): WebDriver {

        let service: chrome.ServiceBuilder = new chrome.ServiceBuilder(path)
            .loggingTo('typescript\\log\\chrome.log')
            .enableVerboseLogging();

        let webDriver: ThenableWebDriver = new Builder()
            .setChromeService(service)
            .withCapabilities(capabilities)
            .build();

        if (driverConfig.chrome.maximize)
            webDriver.manage().window().maximize();

        return webDriver;

    }

}