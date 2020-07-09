import IInteractiveContainer from "./i-interactive-container";

export default interface IBatchElementsContainer extends IInteractiveContainer {

    changeValues(inputData: Map<string, object>): IBatchElementsContainer;
    readValues(): Map<string, string>;
    
}