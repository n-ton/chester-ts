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
const selenium_webdriver_1 = require("selenium-webdriver");
const factory_provider_1 = require("../src/uidriver/factory-provider");
const textbox_1 = require("../src/html/elements/textbox");
const chai_1 = require("chai");
const abstract_container_1 = require("../src/html/containers/abstract-container");
(function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getPageDriver().goToUrl('http://www.google.com/ncr');
            let container = new abstract_container_1.default();
            let textBox = new textbox_1.default("//*[@name='q']", container);
            yield textBox.changeValue('webdriver', selenium_webdriver_1.Key.RETURN);
            // await FactoryProvider.getWebDriverFactory().createWaitingDriver().waitUntilTitleIs('webdriver - Google Search', 1000);
            chai_1.expect(yield factory_provider_1.FactoryProvider.getWebDriverFactory().getPageDriver().getTitle()).is.equal('webdriver - Google Search');
        }
        finally {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().quitDriver();
        }
    });
})();
