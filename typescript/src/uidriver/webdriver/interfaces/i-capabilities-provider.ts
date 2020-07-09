import { Capabilities } from 'selenium-webdriver';
import { ICapsConfig } from '../../../config/i-caps-config';

export interface ICapabilitiesProvider {

    getCapabilities(browserConfig: ICapsConfig): Capabilities;
    
}