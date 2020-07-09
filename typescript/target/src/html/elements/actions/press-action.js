"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_action_1 = require("./abstract-action");
const wd_actions_chain_1 = require("../../../uidriver/webdriver/wd-actions-chain");
class PressAction extends abstract_action_1.default {
    constructor() {
        super(...arguments);
        this.iActionsChain = new wd_actions_chain_1.WdActionsChain();
    }
    dispatchAction(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.iActionsChain.press(element))
                .perform();
        });
    }
}
exports.default = PressAction;
