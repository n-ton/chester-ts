import { ICapsConfig } from "../config/i-caps-config";
import { capsConfig } from "../config/caps.config";

export default class CliUtils {

    private static args: string[] = process.argv;
    private static argsMap: Map<string, string> = new Map();

    static readProcessArgs(): Map<string, string> {

        if (this.argsMap.size == 0) {
            this.validate(this.args);

            this.argsMap.set('node_path', this.args[0]);
            this.argsMap.set('mocha_path', this.args[1]);
            this.argsMap.set('suite_path', this.args[2]);

            this.args.forEach((value, index) => {
                if (value.startsWith('--')) {
                    this.argsMap.set(value.replace('--', ''), this.args[index + 1]);
                }
            });
            console.info(this.argsMap)
        }
        return this.argsMap;
    }

    private static validate(args: string[]) {

        // params
        if (args.slice(3, args.length).length % 2 != 0) {
            throw new Error(`Params count is not as expected.\n${args}`);
        }
    }

    static getBrowserConfigFromCli(): ICapsConfig {

        const browser = this.readProcessArgs().get('config.browser');

        if (browser == undefined) {
            console.log(`--config.browser has not been provided in CLI, browsers.chrome will be used.`)
            return capsConfig.chrome;
        } else {
            let browserConfig = Object.entries<ICapsConfig>(capsConfig).find(name => name[0] == browser)?.[1];
            if (browserConfig != undefined) {
                return browserConfig;
            } else {
                console.log(`--config.browser ${browser} has not been found, browsers.chrome will be used.`)
                return capsConfig.chrome;
            }
        }

    }
}