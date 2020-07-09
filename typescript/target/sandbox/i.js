"use strict";
class MyAbstractContainer {
    constructor(locator, context, contextLookup = true) {
        this.name = this.constructor.name;
        this.locator = locator;
        this.context = context;
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
            console.warn(`No context defined for element '${this.getName()}'`);
        }
        return elements;
    }
    getLoggableContext() {
        const context = this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ');
        return context;
    }
    getLocatableContext() {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ');
    }
    getLoggableName() {
        const context = this.getLoggableContext();
        const name = this.getName() + " [" + this.getLocator() + "]";
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    }
    useContextLookup() {
        return this.contextLookup;
    }
    getLocator() {
        return this.locator;
    }
    getContext() {
        return this.context;
    }
    getName() {
        return this.name;
    }
}
class MyContainer extends MyAbstractContainer {
}
class MyAbstractElement {
    constructor(locator, context, contextLookup = true) {
        this.name = this.constructor.name;
        this.locator = locator;
        this.context = context;
        this.contextLookup = contextLookup;
    }
    getContext() {
        return this.context;
    }
    useContextLookup() {
        return this.contextLookup;
    }
    getName() {
        return this.name;
    }
    getLocator() {
        return this.locator;
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
        const context = this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ');
        return context;
    }
    getLocatableContext() {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ');
    }
    getLoggableName() {
        const context = this.getLoggableContext();
        const name = this.getName() + " [" + this.getLocator() + "]";
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    }
}
class MyElement extends MyAbstractElement {
    constructor(locator, context, contextLookup) {
        super(locator, context, contextLookup);
    }
}
let page = new MyContainer(undefined, undefined, false);
let container1 = new MyContainer("//*[@id='container1']", page, true);
let container2 = new MyContainer("//*[@id='container2']", container1, true);
let container3 = new MyContainer("//*[@id='container3']", container2, true);
let element = new MyElement("//*[@id='element']", container2, true);
// console.log(container3.getLookupContext(true))
// console.info(element.getLoggableContext())
console.info(element.getLoggableName());
