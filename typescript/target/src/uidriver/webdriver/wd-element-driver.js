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
exports.WdElementDriver = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const factory_provider_1 = require("../factory-provider");
const wd_actions_chain_1 = require("../webdriver/wd-actions-chain");
class WdElementDriver {
    findElement(element) {
        const driver = factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver();
        let locator = element.getLocator();
        console.info(`Searching for element '${element.getLoggableName()}' in context '${element.getLoggableContext()}'`);
        if (!element.useContextLookup()) {
            return this.webElementPromiseCallback(element, driver.findElement(selenium_webdriver_1.By.xpath(locator)));
        }
        else {
            const elements = element.getLookupContext(true);
            if (elements.length != 0) {
                let index = 0;
                let containerPromise;
                do {
                    const context = elements[index];
                    containerPromise = driver.findElement(selenium_webdriver_1.By.xpath(context.getLocator()));
                    this.webElementPromiseCallback(context, containerPromise);
                    index++;
                } while (index < elements.length);
                return this.webElementPromiseCallback(element, containerPromise.findElement(selenium_webdriver_1.By.xpath(locator)));
            }
            else {
                return this.webElementPromiseCallback(element, driver.findElement(selenium_webdriver_1.By.xpath(locator)));
            }
        }
    }
    webElementPromiseCallback(element, webElementPromise) {
        webElementPromise.then(() => {
            console.info(`SUCCESS: found element '${element.getLoggableName()}'`);
        }).catch((err) => {
            console.error(`FAILED: element '${element.getLoggableName()}' not found`);
            console.error(err);
        });
        return webElementPromise;
    }
    clearElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.findElement(element)).clear();
        });
    }
    sendKeysToElement(element, ...keysToSend) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.findElement(element)).sendKeys(...keysToSend);
        });
    }
    getText(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.findElement(element);
            return yield webElement.getText();
        });
    }
    isElementDisplayed(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.findElement(element);
            return yield webElement.isDisplayed();
        });
    }
    clickOnElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.findElement(element);
            console.log(`Click on element ${element.getLocator()}`);
            return yield webElement.click();
        });
    }
    contextClickOnElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver()
                .waitUntilElementIsClickable(element);
            (yield new wd_actions_chain_1.WdActionsChain()
                .contextClick(element))
                .perform();
        });
    }
    clickOnElementWithKeyPressed(element, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver()
                .waitUntilElementIsClickable(element);
            ((yield new wd_actions_chain_1.WdActionsChain()
                .keyDown(key.toString())
                .click(element))
                .keyUp(key.toString()))
                .perform();
        });
    }
    getFullText(element) {
        return factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().getAttributeValueOfElement(element, 'textContent');
    }
    isElementEnabled(element) {
        return __awaiter(this, void 0, void 0, function* () {
            let webElement = yield this.findElement(element);
            return webElement.isEnabled();
        });
    }
    isElementSelected(element) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.findElement(element)).isSelected();
        });
    }
    scrollToElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeScript('arguments[0].scrollIntoView(false)', element);
        });
    }
    takeElementScreenshot(element) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().takeScreenshot();
        });
    }
    highlightElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeScript("arguments[0].style.border='5px solid red';", element);
        });
    }
    unHighlightElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeScript("arguments[0].style.border='';", element);
        });
    }
    addElementDebugInfo(element, info, tooltip) {
        return __awaiter(this, void 0, void 0, function* () {
            let webElement = yield this.findElement(element);
            let rect = yield webElement.getRect();
            const script = "var node = document.getElementById('wdDebugInfo');"
                + "if (!node){"
                + "node = document.createElement('span');"
                + "node.id = 'wdDebugInfo';"
                + "node.style.position = 'fixed';"
                + "node.style.zIndex = '9999999';"
                + "node.style.color = 'white';"
                + "node.style.background = 'red';"
                + "node.style['font-weight'] = 'bold';"
                + "node.style['font-size'] = '10pt';"
                + "document.body.appendChild(node);}"
                + "node.innerHTML = arguments[3];"
                + "node.title = arguments[4];"
                + "node.style.display = 'block';"
                + "node.style.left = window.innerWidth < arguments[1] + node.offsetWidth ? (window.innerWidth - node.offsetWidth - 5) < 0 ? 0 + 'px': (window.innerWidth - node.offsetWidth - 5) + 'px' : arguments[1] + 'px';"
                + "node.style.top = arguments[2] - node.offsetHeight - 5 > 0 ? (arguments[2] - node.offsetHeight - 5) + 'px' : (arguments[2] + arguments[4].offsetHeight + 5) + 'px';";
            yield this.executeScript(script, element, rect.x, rect.y, info, tooltip);
        });
    }
    getAttributeValueOfElement(element, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.findElement(element)).getAttribute(attribute);
        });
    }
    setAttributeValueOfElement(element, attribute, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let script = `arguments[0].setAttribute('${attribute}', '${value}')`;
            yield this.executeScript(script, element);
        });
    }
    executeScript(script, element, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (element != undefined) {
                let webElement = yield this.findElement(element);
                console.log(`Executing script '${script}' on '${element.getLoggableName()}'`);
                return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().executeScript(script, webElement, ...args);
            }
            else {
                console.log(`Executing script '${script}'`);
                return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().executeScript(script, ...args);
            }
        });
    }
    removeElementDebugInfo(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const script = "var node = document.getElementById('wdDebugInfo');" +
                "if (node) {node.style.display = 'none'}";
            yield this.executeScript(script, element);
        });
    }
}
exports.WdElementDriver = WdElementDriver;
