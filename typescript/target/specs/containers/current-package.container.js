"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentPackage = void 0;
const abstract_container_1 = require("../../src/html/containers/abstract-container");
const text_1 = require("../../src/html/elements/text");
class CurrentPackage extends abstract_container_1.default {
    constructor(locator, context) {
        super(locator, undefined, context);
        this.title = new text_1.default(`//*[@class='jss1 jss41']`, this);
        this.addElement(this.title);
    }
}
exports.CurrentPackage = CurrentPackage;
