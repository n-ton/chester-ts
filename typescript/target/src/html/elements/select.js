"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_element_1 = require("./abstract-element");
class Select extends abstract_element_1.default {
    constructor(locator, context) {
        super(locator, context);
        this.isMulti = false;
    }
}
