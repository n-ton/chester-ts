import { allConfigs } from '../../all-configs'

export const selenoidConfig = {
  default: {
    url: 'http://localhost:4444/wd/hub',
    enableVNC: true,
    enableVideo: true,
    screenResolution: '1920x1080',
    maxInstances: 5,
    browserName: allConfigs?.capsConfig.browserName,
  },
}
