import IInteractiveElement from "./i-interactive-element";

export default interface ISelectable extends IInteractiveElement {

    isSelected(): Promise<boolean>;
    select(): Promise<IInteractiveElement>;
    deselect(): Promise<IInteractiveElement>;
}