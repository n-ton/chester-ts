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
exports.WdPageDriver = void 0;
const factory_provider_1 = require("../factory-provider");
class WdPageDriver {
    goToUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`Opening URL '${url}'`);
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().get(url);
        });
    }
    maximizeWindow() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Maximizing window`);
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().manage().window().maximize();
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Refreshing page`);
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().navigate().refresh();
        });
    }
    navigateTo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Navigating to a new URL '${url}'`);
            yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().navigate().to(url);
        });
    }
    getTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Getting title`);
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getDriver().getTitle();
        });
    }
}
exports.WdPageDriver = WdPageDriver;
