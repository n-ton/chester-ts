var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyAbstractContainer = /** @class */ (function () {
    function MyAbstractContainer(locator, context, contextLookup) {
        if (contextLookup === void 0) { contextLookup = true; }
        this.name = this.constructor.name;
        this.locator = locator;
        this.context = context;
        this.contextLookup = contextLookup;
    }
    MyAbstractContainer.prototype.getLookupContext = function (useContextLookup) {
        var elements = new Array();
        if (!useContextLookup) {
            var context_1 = this.getContext();
            while (context_1 != undefined && context_1.getLocator() != undefined) {
                elements.push(context_1);
                context_1 = context_1.getContext();
            }
        }
        else if (useContextLookup) {
            if (this.useContextLookup()) {
                var context_2 = this.getContext();
                while (context_2 != undefined && context_2.getLocator() != undefined) {
                    elements.push(context_2);
                    if (!context_2.useContextLookup()) {
                        break;
                    }
                    else {
                        context_2 = context_2.getContext();
                    }
                }
            }
        }
        if (elements.reverse().length == 0) {
            console.warn("No context defined for element '" + this.getName() + "'");
        }
        return elements;
    };
    MyAbstractContainer.prototype.getLoggableContext = function () {
        var context = this.getLookupContext(true)
            .map(function (iLocatable) { return iLocatable.getName() + " [" + iLocatable.getLocator() + "]"; })
            .join(' > ');
        return context;
    };
    MyAbstractContainer.prototype.getLocatableContext = function () {
        return this.getLookupContext(true)
            .map(function (iLocatable) { return iLocatable.getLocator(); })
            .join(' > ');
    };
    MyAbstractContainer.prototype.getLoggableName = function () {
        var context = this.getLoggableContext();
        var name = this.getName() + " [" + this.getLocator() + "]";
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    };
    MyAbstractContainer.prototype.useContextLookup = function () {
        return this.contextLookup;
    };
    MyAbstractContainer.prototype.getLocator = function () {
        return this.locator;
    };
    MyAbstractContainer.prototype.getContext = function () {
        return this.context;
    };
    MyAbstractContainer.prototype.getName = function () {
        return this.name;
    };
    return MyAbstractContainer;
}());
var MyContainer = /** @class */ (function (_super) {
    __extends(MyContainer, _super);
    function MyContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyContainer;
}(MyAbstractContainer));
var MyAbstractElement = /** @class */ (function () {
    function MyAbstractElement(locator, context, contextLookup) {
        if (contextLookup === void 0) { contextLookup = true; }
        this.name = this.constructor.name;
        this.locator = locator;
        this.context = context;
        this.contextLookup = contextLookup;
    }
    MyAbstractElement.prototype.getContext = function () {
        return this.context;
    };
    MyAbstractElement.prototype.useContextLookup = function () {
        return this.contextLookup;
    };
    MyAbstractElement.prototype.getName = function () {
        return this.name;
    };
    MyAbstractElement.prototype.getLocator = function () {
        return this.locator;
    };
    MyAbstractElement.prototype.getLookupContext = function (useContextLookup) {
        var elements = new Array();
        if (!useContextLookup) {
            var context_3 = this.getContext();
            while (context_3 != undefined && context_3.getLocator() != undefined) {
                elements.push(context_3);
                context_3 = context_3.getContext();
            }
        }
        else if (useContextLookup) {
            if (this.useContextLookup()) {
                var context_4 = this.getContext();
                while (context_4 != undefined && context_4.getLocator() != undefined) {
                    elements.push(context_4);
                    if (!context_4.useContextLookup()) {
                        break;
                    }
                    else {
                        context_4 = context_4.getContext();
                    }
                }
            }
        }
        if (elements.reverse().length == 0) {
            console.warn("No context found for element '" + this.getName() + "'");
        }
        return elements;
    };
    MyAbstractElement.prototype.getLoggableContext = function () {
        var context = this.getLookupContext(true)
            .map(function (iLocatable) { return iLocatable.getName() + " [" + iLocatable.getLocator() + "]"; })
            .join(' > ');
        return context;
    };
    MyAbstractElement.prototype.getLocatableContext = function () {
        return this.getLookupContext(true)
            .map(function (iLocatable) { return iLocatable.getLocator(); })
            .join(' > ');
    };
    MyAbstractElement.prototype.getLoggableName = function () {
        var context = this.getLoggableContext();
        var name = this.getName() + " [" + this.getLocator() + "]";
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    };
    return MyAbstractElement;
}());
var MyElement = /** @class */ (function (_super) {
    __extends(MyElement, _super);
    function MyElement(locator, context, contextLookup) {
        return _super.call(this, locator, context, contextLookup) || this;
    }
    return MyElement;
}(MyAbstractElement));
var page = new MyContainer(undefined, undefined, false);
var container1 = new MyContainer("//*[@id='container1']", page, true);
var container2 = new MyContainer("//*[@id='container2']", container1, true);
var container3 = new MyContainer("//*[@id='container3']", container2, true);
var element = new MyElement("//*[@id='element']", container2, true);
// console.log(container3.getLookupContext(true))
// console.info(element.getLoggableContext())
console.info(element.getLoggableName());
