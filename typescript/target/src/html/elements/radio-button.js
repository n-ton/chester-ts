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
const abstract_element_1 = require("./abstract-element");
const factory_provider_1 = require("../../uidriver/factory-provider");
class RadioButton extends abstract_element_1.default {
    constructor(locator, context) {
        super(locator, context);
    }
    isSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield factory_provider_1.FactoryProvider.getWebDriverFactory().getElementDriver().isElementSelected(this);
        });
    }
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isSelected())) {
                this.performAction();
            }
            return this;
        });
    }
    deselect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isSelected()) {
                this.performAction();
            }
            return this;
        });
    }
    readValue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.isSelected()).toString();
        });
    }
    changeValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value instanceof Number) {
                if (value == 0) {
                    yield this.deselect();
                }
                else {
                    yield this.select();
                }
            }
            else if (value instanceof Boolean) {
                if (value == false) {
                    yield this.deselect();
                }
                else {
                    yield this.select();
                }
            }
            else if (value instanceof String) {
                if (value == 'false') {
                    yield this.deselect();
                }
                else {
                    yield this.select();
                }
            }
        });
    }
}
