
interface MyLocatable {
    getLocator(): string | undefined
    getContext(): MyLocatable | undefined
    getLookupContext(useContextLookup: boolean): Array<MyLocatable> | undefined
    getName(): string
    useContextLookup(): boolean
    getLocatableContext(): string
    getLoggableContext(): string
}

class MyAbstractContainer implements MyLocatable {
    private name: string = this.constructor.name;
    private locator: string | undefined;
    private context?: MyLocatable;
    private contextLookup: boolean;

    constructor(locator?: string, context?: MyLocatable, contextLookup: boolean = true) {
        this.locator = locator
        this.context = context
        this.contextLookup = contextLookup
    }

    getLookupContext(useContextLookup: boolean): Array<MyLocatable> {
        let elements: Array<MyLocatable> = new Array<MyLocatable>();

        if (!useContextLookup) {

            let context: any = this.getContext();

            while (context != undefined && context.getLocator() != undefined) {
                elements.push(context);
                context = context.getContext();
            }

        } else if (useContextLookup) {

            if (this.useContextLookup()) {
                let context: any = this.getContext();

                while (context != undefined && context.getLocator() != undefined) {
                    elements.push(context);
                    if (!context.useContextLookup()) {
                        break;
                    } else {
                        context = context.getContext();
                    }
                }
            }
        }
        if (elements.reverse().length == 0) {
            console.warn(`No context defined for element '${this.getName()}'`)
        }
        return elements;
    }

    getLoggableContext(): string {
        const context: string = this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ')

        return context;
    }

    getLocatableContext(): string {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ')
    }

    getLoggableName(): string {
        const context: string = this.getLoggableContext()
        const name: string = this.getName() + " [" + this.getLocator() + "]"
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    }

    useContextLookup(): boolean {
        return this.contextLookup
    }

    getLocator(): string | undefined {
        return this.locator
    }

    getContext(): MyLocatable | undefined {
        return this.context
    }

    getName(): string {
        return this.name
    }
}

class MyContainer extends MyAbstractContainer {


}

abstract class MyAbstractElement implements MyLocatable {
    private locator: string;
    private name: string = this.constructor.name;
    private context: MyLocatable
    private contextLookup: boolean;

    constructor(locator: string, context: MyLocatable, contextLookup: boolean = true) {
        this.locator = locator
        this.context = context
        this.contextLookup = contextLookup
    }
    getContext(): MyLocatable | undefined {
        return this.context;
    }

    useContextLookup(): boolean {
        return this.contextLookup;
    }

    getName(): string {
        return this.name;
    }

    public getLocator(): string {
        return this.locator;
    }

    getLookupContext(useContextLookup: boolean): Array<MyLocatable> {
        let elements: Array<MyLocatable> = new Array<MyLocatable>();

        if (!useContextLookup) {

            let context: any = this.getContext();

            while (context != undefined && context.getLocator() != undefined) {
                elements.push(context);
                context = context.getContext();
            }

        } else if (useContextLookup) {

            if (this.useContextLookup()) {
                let context: any = this.getContext();

                while (context != undefined && context.getLocator() != undefined) {
                    elements.push(context);
                    if (!context.useContextLookup()) {
                        break;
                    } else {
                        context = context.getContext();
                    }
                }
            }
        }
        if (elements.reverse().length == 0) {
            console.warn(`No context found for element '${this.getName()}'`)
        }
        return elements;
    }

    getLoggableContext(): string {
        const context: string = this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ')

        return context;
    }

    getLocatableContext(): string {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ')
    }

    getLoggableName(): string {
        const context: string = this.getLoggableContext()
        const name: string = this.getName() + " [" + this.getLocator() + "]"
        if (context == '') {
            return name;
        }
        return this.getLoggableContext() + " > " + name;
    }

}

class MyElement extends MyAbstractElement {

    constructor(locator: string, context: MyAbstractContainer, contextLookup: boolean) {
        super(locator, context, contextLookup);
    }

}
let page: MyContainer = new MyContainer(undefined, undefined, false)
let container1: MyContainer = new MyContainer("//*[@id='container1']", page, true);
let container2: MyContainer = new MyContainer("//*[@id='container2']", container1, true);
let container3: MyContainer = new MyContainer("//*[@id='container3']", container2, true);
let element: MyElement = new MyElement("//*[@id='element']", container2, true);

// console.log(container3.getLookupContext(true))
// console.info(element.getLoggableContext())
console.info(element.getLoggableName())