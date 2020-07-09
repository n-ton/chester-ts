"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebDriverFactory = void 0;
const index_1 = require("selenium-webdriver/index");
const wd_page_driver_1 = require("./wd-page-driver");
const wd_element_driver_1 = require("./wd-element-driver");
const wd_waiting_driver_1 = require("./wd-waiting-driver");
const cli_utils_1 = require("../../utils/cli-utils");
const config_1 = require("../../config/config");
class WebDriverFactory {
    constructor() {
        this.namedDrivers = new Map;
        this.currentSession = "default_driver_session";
        this.browserConfig = cli_utils_1.default.getBrowserConfigFromCli();
    }
    getDriver() {
        if (this.driver == undefined || this.driver == null) {
            console.info(`Starting driver.`);
            this.driver = this.createDriver(this.browserConfig);
            this.namedDrivers.set(this.currentSession, this.driver);
            this.setWaitingTimeout();
        }
        else {
            console.info(`Getting driver.`);
        }
        return this.driver;
    }
    isDriverStarted() {
        return this.driver != null && this.driver != undefined;
    }
    isBrowserAlive() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDriverStarted()) {
                let awh;
                try {
                    awh = yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.getAllWindowHandles());
                }
                catch (e) {
                    if (e instanceof index_1.error.NoSuchSessionError) {
                        console.error(e.name + ': ' + e.message);
                    }
                    else {
                        console.error(`Unknown error ${e.name}`);
                        throw e;
                    }
                    awh = undefined;
                    this.driver = undefined;
                }
                console.info(`All window handles ${awh}.`);
                return awh != undefined ? awh.length != 0 : false;
            }
            else {
                console.warn('Driver is not started.');
            }
        });
    }
    quitDriver() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDriverStarted()) {
                const browserName = (_a = (yield this.getCapabilities())) === null || _a === void 0 ? void 0 : _a.getBrowserName();
                const sessionId = yield this.getCurrentSessionId();
                try {
                    yield ((_b = this.driver) === null || _b === void 0 ? void 0 : _b.quit());
                }
                finally {
                    console.warn(`Quit current session ${sessionId}.`);
                }
                console.info(`Closing browser ${browserName}.`);
                this.driver = undefined;
            }
            else {
                console.warn(`Driver is not started.`);
            }
        });
    }
    getCapabilities() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDriverStarted()) {
                let capabilities = yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.getCapabilities());
                return capabilities;
            }
            else {
                console.warn('Driver is not started.');
            }
        });
    }
    getCurrentWindowHandle() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isBrowserAlive()) {
                let currentWindowHandle = yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.getWindowHandle());
                console.info(`Current window ${currentWindowHandle}.`);
                return currentWindowHandle;
            }
            else {
                console.warn('Browser is not alive. There are no available windows.');
            }
        });
    }
    closeWindow() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isBrowserAlive()) {
                let currentWindowHandle = yield this.getCurrentWindowHandle();
                console.info(`Closing current window ${currentWindowHandle}.`);
                yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.close());
            }
            else {
                console.warn('Browser is not alive. There are no available windows.');
            }
        });
    }
    getCurrentSessionId() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDriverStarted()) {
                let currentSession = yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.getSession());
                let currentSessionId = currentSession === null || currentSession === void 0 ? void 0 : currentSession.getId();
                console.info(`Current session ${currentSessionId}.`);
                return currentSessionId;
            }
            else {
                console.warn('Driver is not started.');
            }
        });
    }
    setWaitingTimeout(timeout = {
        script: config_1.config.timeouts.implicit,
        pageLoad: config_1.config.timeouts.pageLoad,
        implicit: config_1.config.timeouts.implicit
    }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`Setting global timeouts ${Object.entries(timeout)}`);
            yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.manage().setTimeouts(timeout));
        });
    }
    maximizeWindow() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isBrowserAlive()) {
                console.info(`Maximizing window.`);
                yield ((_a = this.driver) === null || _a === void 0 ? void 0 : _a.manage().window().maximize());
            }
            else {
                console.warn('Browser is not alive. There are no available windows.');
            }
        });
    }
    getPageDriver() {
        if (this.pageDriver == null || this.pageDriver == undefined) {
            return new wd_page_driver_1.WdPageDriver();
        }
        else {
            return this.pageDriver;
        }
    }
    getElementDriver() {
        if (this.elementDriver == null || this.elementDriver == undefined) {
            return new wd_element_driver_1.WdElementDriver();
        }
        else {
            return this.elementDriver;
        }
    }
    getWaitingDriver() {
        if (this.waitingDriver == null || this.waitingDriver == undefined) {
            return new wd_waiting_driver_1.WdWaitingDriver();
        }
        else {
            return this.waitingDriver;
        }
    }
}
exports.WebDriverFactory = WebDriverFactory;
