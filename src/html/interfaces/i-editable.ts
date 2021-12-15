export default interface IEditable {
  changeValue(...value: any[]): Promise<void>
}
