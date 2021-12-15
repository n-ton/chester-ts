import IInteractive from './i-interactive'

export default interface ISelectable {
  isSelected(): Promise<boolean>
  select(): Promise<IInteractive>
  deselect(): Promise<IInteractive>
}
