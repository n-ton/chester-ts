export const selenoidConfig = {
  default: {
    url: 'http://localhost',
    port: '4444',
    path: '/wd/hub',
    enableVNC: true,
    enableVideo: true,
    enableLog: true,
    screenResolution: '1280x1024x24',
    videoCodec: 'mpeg4',
  },
  ci: {
    url: 'http://localhost',
    port: '4444',
    path: '/wd/hub',
    enableVNC: false,
    enableVideo: false,
    enableLog: false,
    screenResolution: '1280x1024x24',
  },
}
