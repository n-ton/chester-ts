import AbstractContainer from "./abstract-container";
import { FactoryProvider } from "../../uidriver/factory-provider";
import { config } from "../../config/config";

export abstract class AbstractPage extends AbstractContainer {

    constructor(url: string) {
        super(undefined, url, undefined, undefined, undefined);
    }

    async goToUrl(url?: string) {

        const fullUrl: string = url != undefined ? url : `${config.baseUrl}` + this.getUrl();

        await FactoryProvider.getWebDriverFactory()
            .getPageDriver()
            .goToUrl(fullUrl);
    }

    async refresh() {
        await FactoryProvider.getWebDriverFactory()
            .getPageDriver()
            .refresh();
    }

}