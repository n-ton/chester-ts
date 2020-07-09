import { Key } from 'selenium-webdriver'
import { FactoryProvider } from "../src/uidriver/factory-provider";
import TextBox from "../src/html/elements/textbox";
import { expect } from "chai";
import AbstractContainer from "../src/html/containers/abstract-container";

(async function run() {
  try {

    await FactoryProvider.getWebDriverFactory().getPageDriver().goToUrl('http://www.google.com/ncr');

    let container: AbstractContainer = new AbstractContainer();
    let textBox: TextBox = new TextBox("//*[@name='q']", container);

    await textBox.changeValue('webdriver', Key.RETURN);
    // await FactoryProvider.getWebDriverFactory().createWaitingDriver().waitUntilTitleIs('webdriver - Google Search', 1000);
    expect(await FactoryProvider.getWebDriverFactory().getPageDriver().getTitle()).is.equal('webdriver - Google Search');

  } finally {
    await FactoryProvider.getWebDriverFactory().quitDriver();
  }
})();