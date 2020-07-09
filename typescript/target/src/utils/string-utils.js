"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    static locatorToId(locator) {
        let pattern = new RegExp('\\W');
        let locators = locator.split(pattern);
        return locators.filter((element) => {
            return element != '';
        }).join('_');
    }
}
exports.default = StringUtils;
