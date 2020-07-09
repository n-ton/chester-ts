import { FactoryProvider } from "../../uidriver/factory-provider";
import { IWaitingDriver } from "../../uidriver/interfaces/i-waiting-driver";
import IInteractiveElement from "./interfaces/i-interactive-element";
import IInteractiveContainer from "../containers/interfaces/i-interactive-container";
import AbstractAction from "./actions/abstract-action";

export default abstract class AbstractElement implements IInteractiveElement {

    private locator: string;
    private name: string = this.constructor.name;
    private optional: boolean;
    private contextLookup: boolean;
    private context: ILocatable;

    constructor(locator: string, context: IInteractiveContainer, optional: boolean = false, contextLookup: boolean = true) {
        this.locator = locator;
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

    getLocator(): string {
        return this.locator;
    }

    setLocator(locator: string) {
        this.locator = locator;
    }

    isOptional(): boolean {
        return this.optional;
    }

    setOptional(optional: boolean) {
        this.optional = optional;
    }

    getContext(): ILocatable {
        return this.context;
    }

    setContext(context: ILocatable): void {
        this.context = context;
    }

    useContextLookup(): boolean {
        return this.contextLookup;
    }

    setContextLookup(contextLookup: boolean) {
        this.contextLookup = contextLookup;
    }

    getLookupContext(useContextLookup: boolean): ILocatable[] {
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

    async changeValue(...value: any): Promise<void> {
        await FactoryProvider.getWebDriverFactory().getElementDriver().sendKeysToElement(this, value);
    }

    async readValue(): Promise<string> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().getText(this);
    }

    async performAction(action?: AbstractAction) {
        if (action == undefined) {
            await FactoryProvider.getWebDriverFactory().getElementDriver().clickOnElement(this);
        } else {
            await action.dispatchAction(this);
        }
    }

    async isDisplayed(): Promise<boolean> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().isElementDisplayed(this);
    }

    waitUntil(): IWaitingDriver {
        return FactoryProvider.getWebDriverFactory().getWaitingDriver();
    }

    async isEnabled(): Promise<boolean> {
        return await FactoryProvider.getWebDriverFactory().getElementDriver().isElementEnabled(this);
    }

}