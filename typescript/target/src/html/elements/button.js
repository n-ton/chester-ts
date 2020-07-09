"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_element_1 = require("./abstract-element");
class Button extends abstract_element_1.default {
    constructor(locator, context) {
        super(locator, context);
    }
    changeValue(value) {
        throw new Error('Operation is not supported');
    }
}
exports.default = Button;
