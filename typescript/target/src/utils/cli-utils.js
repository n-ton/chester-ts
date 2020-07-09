"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caps_config_1 = require("../config/caps.config");
class CliUtils {
    static readProcessArgs() {
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
            console.info(this.argsMap);
        }
        return this.argsMap;
    }
    static validate(args) {
        // params
        if (args.slice(3, args.length).length % 2 != 0) {
            throw new Error(`Params count is not as expected.\n${args}`);
        }
    }
    static getBrowserConfigFromCli() {
        var _a;
        const browser = this.readProcessArgs().get('config.browser');
        if (browser == undefined) {
            console.log(`--config.browser has not been provided in CLI, browsers.chrome will be used.`);
            return caps_config_1.capsConfig.chrome;
        }
        else {
            let browserConfig = (_a = Object.entries(caps_config_1.capsConfig).find(name => name[0] == browser)) === null || _a === void 0 ? void 0 : _a[1];
            if (browserConfig != undefined) {
                return browserConfig;
            }
            else {
                console.log(`--config.browser ${browser} has not been found, browsers.chrome will be used.`);
                return caps_config_1.capsConfig.chrome;
            }
        }
    }
}
exports.default = CliUtils;
CliUtils.args = process.argv;
CliUtils.argsMap = new Map();
