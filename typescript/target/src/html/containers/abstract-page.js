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
exports.AbstractPage = void 0;
const abstract_container_1 = require("./abstract-container");
const factory_provider_1 = require("../../uidriver/factory-provider");
const config_1 = require("../../config/config");
class AbstractPage extends abstract_container_1.default {
    constructor(url) {
        super(undefined, url, undefined, undefined, undefined);
    }
    goToUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullUrl = url != undefined ? url : `${config_1.config.baseUrl}` + this.getUrl();
            yield factory_provider_1.FactoryProvider.getWebDriverFactory()
                .getPageDriver()
                .goToUrl(fullUrl);
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield factory_provider_1.FactoryProvider.getWebDriverFactory()
                .getPageDriver()
                .refresh();
        });
    }
}
exports.AbstractPage = AbstractPage;
