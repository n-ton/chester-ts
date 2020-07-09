import IElementsContainer from "./i-elements-container";

export default interface IInteractiveContainer extends IElementsContainer {

    changeValue(elementId: string, value: object): void;
    readValue(elementId: string): string;
    performAction(elementId: string): void;
}