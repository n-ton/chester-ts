import { Key } from 'selenium-webdriver'
import { expect } from "chai";
import { DriversFactory } from '../src/uidriver/drivers-factory';
import TextBox from '../src/html/elements/textbox';

(async function run() {
  try {

    await DriversFactory.pageDriver().goToUrl('http://www.google.com/ncr');

    let textBox: TextBox = new TextBox("//*[@name='q']");

    await textBox.changeValue('webdriver', Key.RETURN);
    expect(await DriversFactory.pageDriver().getTitle()).is.equal('webdriver - Google Search');

  } finally {
    await DriversFactory.quitDriver();
  }
})();