import { it } from "mocha"
import OnePage from "./page_objects/one.page";
import { expect } from "chai";
import { FactoryProvider } from "../src/uidriver/factory-provider";
import Text from '../src/html/elements/text';
import { CurrentPackage } from "./containers/current-package.container";
import Button from "../src/html/elements/button";
import PressAction from "../src/html/elements/actions/press-action";
import ClickAction from "../src/html/elements/actions/click-action";

describe('Scenario One', () => {

    describe.skip('Simple verifications', () => {

        it.skip('Check header', async () => {
            OnePage.goToUrl();
            let title: Text = OnePage.header;
            await FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(title);
            expect(await title.readValue()).to.be.equal('Hi Scott, find the best broadband package for you.');
        });

        it.skip('Your current package', async () => {
            await OnePage.goToUrl();
            let currentPackage: CurrentPackage = OnePage.currentPackage;
            await FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(currentPackage);
            await FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsVisible(currentPackage.title);
            expect(await currentPackage.title.readValue()).to.be.equal('Your current package');
        });

        it(`Select option 'Reassurance'`, async () => {
            await OnePage.goToUrl();
            let button: Button = OnePage.button;
            await FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsClickable(button);
            await button.performAction();

            await OnePage.refresh();
            await FactoryProvider.getWebDriverFactory().getWaitingDriver().waitUntilElementIsClickable(button);
            await button.performAction();
        });

        afterEach(async () => FactoryProvider.getWebDriverFactory().quitDriver());
    })

    describe.skip('debugging', () => {

        it("Check script execution", async () => {
            await OnePage.goToUrl();
            let header: Text = OnePage.header;
            await FactoryProvider.getWebDriverFactory().getElementDriver().setAttributeValueOfElement(header, 'class', 'MuiTypography-root MuiTypography-h2 MuiTypography-new');
        })

        it("Check loggable/locatable name", () => {
            let currentPackage: CurrentPackage = OnePage.currentPackage;
            console.log(currentPackage.title.getLoggableName());
            console.log(currentPackage.title.getLocatableContext());
            console.log(currentPackage.title.getLookupContext(true));
        })

        it("Check cascade search", async () => {
            await OnePage.goToUrl();
            let currentPackage: CurrentPackage = OnePage.currentPackage;
            expect(await currentPackage.title.isDisplayed()).is.true;
        })

        afterEach(async () => await FactoryProvider.getWebDriverFactory().quitDriver());
    });

    describe('debugging', () => {

        it.skip("Check closing driver", async () => {
            await FactoryProvider.getWebDriverFactory().getDriver();
            await FactoryProvider.getWebDriverFactory().getCapabilities();
            await FactoryProvider.getWebDriverFactory().getCurrentWindowHandle();
            await FactoryProvider.getWebDriverFactory().getCurrentSessionId();
            await FactoryProvider.getWebDriverFactory().closeWindow();
            await FactoryProvider.getWebDriverFactory().maximizeWindow();
            await FactoryProvider.getWebDriverFactory().quitDriver();
        })

        it('Check click', async () => {
            await OnePage.goToUrl();
            await OnePage.header.performAction(new ClickAction());
        })

        afterEach('Quit driver', async () => await FactoryProvider.getWebDriverFactory().quitDriver())

    });

});