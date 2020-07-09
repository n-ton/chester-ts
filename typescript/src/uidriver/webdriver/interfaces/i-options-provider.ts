import { Capabilities } from 'selenium-webdriver';
import { ICapsConfig } from '../../../config/i-caps-config';

export default interface IOptionsProvider {

    getOptions(browserConfig: ICapsConfig): Capabilities;

}