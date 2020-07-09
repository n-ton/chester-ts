import { IPageDriver } from "../interfaces/i-page-driver";
import { FactoryProvider } from "../factory-provider"

export class WdPageDriver implements IPageDriver {

    async goToUrl(url: string) {
        console.info(`Opening URL '${url}'`);
        await FactoryProvider.getWebDriverFactory().getDriver().get(url);
    }

    async maximizeWindow() {
        console.log(`Maximizing window`);
        await FactoryProvider.getWebDriverFactory().getDriver().manage().window().maximize();
    }

    async refresh() {
        console.log(`Refreshing page`);
        await FactoryProvider.getWebDriverFactory().getDriver().navigate().refresh();
    }

    async navigateTo(url: string) {
        console.log(`Navigating to a new URL '${url}'`);
        await FactoryProvider.getWebDriverFactory().getDriver().navigate().to(url);
    }

    async getTitle(): Promise<string> {
        console.log(`Getting title`);
        return await FactoryProvider.getWebDriverFactory().getDriver().getTitle();
    }

}