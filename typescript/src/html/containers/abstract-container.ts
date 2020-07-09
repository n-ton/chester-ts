import StringUtils from '../../utils/string-utils';
import IInteractiveElement from '../elements/interfaces/i-interactive-element';
import IInteractiveContainer from './interfaces/i-interactive-container';
import IBatchElementsContainer from './interfaces/i-batch-elements-container';

export default class AbstractContainer implements IBatchElementsContainer, IHaveUrl {

    private name: string = this.constructor.name;
    private locator: string | undefined;
    private url: string | undefined;
    private context: ILocatable | undefined;
    private optional: boolean;
    private contextLookup: boolean;
    private elements: Map<string, ILocatable> = new Map();

    constructor(locator?: string, url?: string, context?: IInteractiveContainer, optional: boolean = false, contextLookup: boolean = true) {
        this.locator = locator;
        this.url = url;
        this.context = context;
        this.optional = optional;
        this.contextLookup = contextLookup;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setLocator(locator: string | undefined) {
        this.locator = locator;
    }

    getLocator(): string | undefined {
        return this.locator;
    }

    useContextLookup(): boolean {
        return this.contextLookup;
    }

    setContextLookup(contextLookup: boolean): void {
        this.contextLookup = contextLookup;
    }

    getContext(): ILocatable | undefined {
        return this.context;
    }

    setContext(context: ILocatable): void {
        this.context = context;
    }

    getUrl(): string {
        return this.url != undefined ? this.url : '';
    }

    setUrl(url: string): void {
        this.url = url;
    }

    setOptional(optional: boolean): void {
        this.optional = optional
    }

    isOptional(): boolean {
        return this.optional;
    }

    getLookupContext(useContextLookup: boolean): Array<ILocatable> {
        let elements: Array<ILocatable> = new Array<ILocatable>();

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
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getName() + " [" + iLocatable.getLocator() + "]")
            .join(' > ')
    }

    getLocatableContext(): string {
        return this.getLookupContext(true)
            .map(iLocatable => iLocatable.getLocator())
            .join(' > ')
    }

    getLoggableName(): string {
        return this.getName() + " [" + this.getLocator() + "]"
    }

    changeValues(inputData: Map<string, object>): IBatchElementsContainer {
        throw new Error("Method not implemented.");
    }
    readValues(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
    changeValue(elementId: string, value: object): void {
        throw new Error("Method not implemented.");
    }
    readValue(elementId: string): string {
        throw new Error("Method not implemented.");
    }
    performAction(elementId: string): void {
        throw new Error("Method not implemented.");
    }
    isDisplayed(): boolean {
        throw new Error("Method not implemented.");
    }

    getElement(elementId: string): IInteractiveElement {
        throw new Error("Method not implemented.");
    }
    getElements(): Map<string, IInteractiveElement> {
        throw new Error("Method not implemented.");
    }

    addElement(element: ILocatable) {
        let locator: any = element.getLocator();
        this.elements.set(StringUtils.locatorToId(locator), element);
    }

}