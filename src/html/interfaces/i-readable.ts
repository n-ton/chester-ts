export default interface IReadable {
  readValue(): Promise<string | number>
}
