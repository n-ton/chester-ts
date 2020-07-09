"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePage = void 0;
const text_1 = require("../../src/html/elements/text");
const current_package_container_1 = require("../containers/current-package.container");
const button_1 = require("../../src/html/elements/button");
const abstract_page_1 = require("../../src/html/containers/abstract-page");
class OnePage extends abstract_page_1.AbstractPage {
    constructor() {
        super(OnePage.URL);
        this.currentPackage = new current_package_container_1.CurrentPackage(`//*[@id='currentPackage']`, this);
        this.button = new button_1.default("(//button)[2]", this);
        this.header = new text_1.default('//h1', this);
        this.addElement(this.currentPackage);
    }
}
exports.OnePage = OnePage;
OnePage.URL = `/scenario-one`;
exports.default = new OnePage();
