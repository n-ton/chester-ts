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
exports.WdWaitingDriver = void 0;
const factory_provider_1 = require("../factory-provider");
const selenium_webdriver_1 = require("selenium-webdriver");
const config_1 = require("../../config/config");
class WdWaitingDriver {
    waitUntilElementIsVisible(element, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver()
                .findElement(element);
            yield this.waitUntil(selenium_webdriver_1.until.elementIsVisible(webElement), timeout);
        });
    }
    waitUntilTitleIs(title, timeout, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitUntil(selenium_webdriver_1.until.titleIs(title), timeout, message);
        });
    }
    waitUntilElementIsClickable(element, timeout, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver()
                .findElement(element);
            yield this.waitUntil(selenium_webdriver_1.until.elementIsVisible(webElement), timeout, message);
            yield this.waitUntil(selenium_webdriver_1.until.elementIsEnabled(webElement), timeout, message);
        });
    }
    waitUntil(condition, timeout, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (timeout == null || timeout == undefined) {
                timeout = config_1.config.waitUntil;
            }
            const msg = `Waiting for condition "${condition.description()}" with timeout ${timeout}`;
            console.log(msg);
            const driver = factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver();
            try {
                yield driver.wait(condition, timeout, message);
                console.log(`SUCCESS: Condition "${condition.description()}" met before timeout ${timeout}`);
            }
            catch (error) {
                console.log(`FAILED: Condition "${condition.description()}" with timeout ${timeout}`);
            }
        });
    }
}
exports.WdWaitingDriver = WdWaitingDriver;
