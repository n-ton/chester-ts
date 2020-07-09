"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = require("../../utils/string-utils");
class AbstractContainer {
    constructor(locator, url, context, optional = false, contextLookup = true) {
        this.name = this.constructor.name;
        this.elements = new Map();
        this.locator = locator;
        this.url = url;
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
    setLocator(locator) {
        this.locator = locator;
    }
    getLocator() {
        return this.locator;
    }
    useContextLookup() {
        return this.contextLookup;
    }
    setContextLookup(contextLookup) {
        this.contextLookup = contextLookup;
    }
    getContext() {
        return this.context;
    }
    setContext(context) {
        this.context = context;
    }
    getUrl() {
        return this.url != undefined ? this.url : '';
    }
    setUrl(url) {
        this.url = url;
    }
    setOptional(optional) {
        this.optional = optional;
    }
    isOptional() {
        return this.optional;
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
    changeValues(inputData) {
        throw new Error("Method not implemented.");
    }
    readValues() {
        throw new Error("Method not implemented.");
    }
    changeValue(elementId, value) {
        throw new Error("Method not implemented.");
    }
    readValue(elementId) {
        throw new Error("Method not implemented.");
    }
    performAction(elementId) {
        throw new Error("Method not implemented.");
    }
    isDisplayed() {
        throw new Error("Method not implemented.");
    }
    getElement(elementId) {
        throw new Error("Method not implemented.");
    }
    getElements() {
        throw new Error("Method not implemented.");
    }
    addElement(element) {
        let locator = element.getLocator();
        this.elements.set(string_utils_1.default.locatorToId(locator), element);
    }
}
exports.default = AbstractContainer;
