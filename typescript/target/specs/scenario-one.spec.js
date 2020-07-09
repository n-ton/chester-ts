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
const mocha_1 = require("mocha");
const one_page_1 = require("./page_objects/one.page");
const chai_1 = require("chai");
const factory_provider_1 = require("../src/uidriver/factory-provider");
const click_action_1 = require("../src/html/elements/actions/click-action");
describe('Scenario One', () => {
    describe.skip('Simple verifications', () => {
        mocha_1.it.skip('Check header', () => __awaiter(void 0, void 0, void 0, function* () {
            one_page_1.default.goToUrl();
            let title = one_page_1.default.header;
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(title);
            chai_1.expect(yield title.readValue()).to.be.equal('Hi Scott, find the best broadband package for you.');
        }));
        mocha_1.it.skip('Your current package', () => __awaiter(void 0, void 0, void 0, function* () {
            yield one_page_1.default.goToUrl();
            let currentPackage = one_page_1.default.currentPackage;
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(currentPackage);
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(currentPackage.title);
            chai_1.expect(yield currentPackage.title.readValue()).to.be.equal('Your current package');
        }));
        mocha_1.it(`Select option 'Reassurance'`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield one_page_1.default.goToUrl();
            let button = one_page_1.default.button;
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsClickable(button);
            yield button.performAction();
            yield one_page_1.default.refresh();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsClickable(button);
            yield button.performAction();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () { return factory_provider_1.FactoryProvider.getWebDriverFactory().quitDriver(); }));
    });
    describe.skip('debugging', () => {
        mocha_1.it("Check script execution", () => __awaiter(void 0, void 0, void 0, function* () {
            yield one_page_1.default.goToUrl();
            let header = one_page_1.default.header;
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().setAttributeValueOfElement(header, 'class', 'MuiTypography-root MuiTypography-h2 MuiTypography-new');
        }));
        mocha_1.it("Check loggable/locatable name", () => {
            let currentPackage = one_page_1.default.currentPackage;
            console.log(currentPackage.title.getLoggableName());
            console.log(currentPackage.title.getLocatableContext());
            console.log(currentPackage.title.getLookupContext(true));
        });
        mocha_1.it("Check cascade search", () => __awaiter(void 0, void 0, void 0, function* () {
            yield one_page_1.default.goToUrl();
            let currentPackage = one_page_1.default.currentPackage;
            chai_1.expect(yield currentPackage.title.isDisplayed()).is.true;
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () { return yield factory_provider_1.FactoryProvider.getWebDriverFactory().quitDriver(); }));
    });
    describe('debugging', () => {
        mocha_1.it.skip("Check closing driver", () => __awaiter(void 0, void 0, void 0, function* () {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getCapabilities();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getCurrentWindowHandle();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getCurrentSessionId();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().closeWindow();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().maximizeWindow();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().quitDriver();
        }));
        mocha_1.it('Check click', () => __awaiter(void 0, void 0, void 0, function* () {
            yield one_page_1.default.goToUrl();
            yield one_page_1.default.header.performAction(new click_action_1.default());
        }));
        afterEach('Quit driver', () => __awaiter(void 0, void 0, void 0, function* () { return yield factory_provider_1.FactoryProvider.getWebDriverFactory().quitDriver(); }));
    });
});
