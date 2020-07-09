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
const factory_provider_1 = require("../../uidriver/factory-provider");
class AbstractElement {
    constructor(locator, context, optional = false, contextLookup = true) {
        this.name = this.constructor.name;
        this.locator = locator;
        this.context = context;
        this.optional = optional;
        this.contextLookup = contextLookup;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getLocator() {
        return this.locator;
    }
    setLocator(locator) {
        this.locator = locator;
    }
    isOptional() {
        return this.optional;
    }
    setOptional(optional) {
        this.optional = optional;
    }
    getContext() {
        return this.context;
    }
    setContext(context) {
        this.context = context;
    }
    useContextLookup() {
        return this.contextLookup;
    }
    setContextLookup(contextLookup) {
        this.contextLookup = contextLookup;
    }
    getLookupContext(useContextLookup) {
        let elements = new Array();
        if (!useContextLookup) {
            let context = this.getContext();
            while (context != undefined && context.getLocator() != undefined) {
                elements.push(context);
                context = context.getContext();
            }
        }
        else if (useContextLookup) {
            if (this.useContextLookup()) {
                let context = this.getContext();
                while (context != undefined && context.getLocator() != undefined) {
                    elements.push(context);
                    if (!context.useContextLookup()) {
                        break;
                    }
                    else {
                        context = context.getContext();
                    }
                }
            }
        }
        if (elements.reverse().length == 0) {
            console.warn(`No context found for element '${this.getName()}'`);
        }
        return elements;
    }
    getLoggableContext() {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ');
    }
    getLocatableContext() {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ');
    }
    getLoggableName() {
        return this.getName() + " [" + this.getLocator() + "]";
    }
    changeValue(...value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().sendKeysToElement(this, value);
        });
    }
    readValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().getText(this);
        });
    }
    performAction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (action == undefined) {
                yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().clickOnElement(this);
            }
            else {
                yield action.dispatchAction(this);
            }
        });
    }
    isDisplayed() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().isElementDisplayed(this);
        });
    }
    waitUntil() {
        return factory_provider_1.FactoryProvider.getWebDriverFactory().getWaitingDriver();
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().isElementEnabled(this);
        });
    }
}
exports.default = AbstractElement;
