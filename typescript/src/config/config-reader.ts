import { IConfigReader } from "./i-config-reader";
import { IConfig } from "./i-config";

export default class ConfigReader implements IConfigReader {

    readData(config: IConfig): any {
        throw new Error("Method not implemented.");
    }

}