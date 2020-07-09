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
exports.WdActionsChain = void 0;
const factory_provider_1 = require("../factory-provider");
class WdActionsChain {
    constructor() {
        this.elementDriver = factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver();
        this.actions = factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().actions();
    }
    contextClick(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.elementDriver.findElement(element);
            this.actions.contextClick(webElement);
            return this;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.actions.clear();
            return this;
        });
    }
    click(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.elementDriver.findElement(element);
            this.actions.click(webElement);
            return this;
        });
    }
    keyDown(key) {
        this.actions.keyDown(key);
        return this;
    }
    keyUp(key) {
        this.actions.keyUp(key);
        return this;
    }
    press(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.elementDriver.scrollToElement(element);
            console.info(`Press on ${element.getLocator()}`);
            this.actions.press();
            return this;
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.actions.perform();
            return this;
        });
    }
}
exports.WdActionsChain = WdActionsChain;
