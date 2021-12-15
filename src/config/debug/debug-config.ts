import { ScrollBehavior, ScrollLogicalPosition } from './i-debug-config'

export const debugConfig = {
  default: {
    highlight: {
      enable: true,
      styleBorder: '1px solid red',
    },
    delay: {
      enable: true,
      time: 1000,
    },
    scrollIntoView: {
      options: {
        behavior: ScrollBehavior.Smooth,
        block: ScrollLogicalPosition.Center,
        inline: ScrollLogicalPosition.Center,
      },
    },
  },
  default_2: {
    highlight: {
      enable: true,
      styleBorder: '3px solid red',
    },
    delay: {
      enable: true,
      time: 500,
    },
    scrollIntoView: {
      options: {
        behavior: ScrollBehavior.Smooth,
        block: ScrollLogicalPosition.Center,
        inline: ScrollLogicalPosition.Center,
      },
    },
  },
  ci: {
    highlight: {
      enable: false,
      styleBorder: '1px solid red',
    },
    delay: {
      enable: false,
      time: 1000,
    },
    scrollIntoView: {
      options: {
        behavior: ScrollBehavior.Auto,
        block: ScrollLogicalPosition.Center,
        inline: ScrollLogicalPosition.Center,
      },
    },
  },
  no_highlight: {
    highlight: {
      enable: false,
      styleBorder: '1px solid red',
    },
    delay: {
      enable: true,
      time: 1000,
    },
    scrollIntoView: {
      options: {
        behavior: ScrollBehavior.Auto,
        block: ScrollLogicalPosition.Center,
        inline: ScrollLogicalPosition.Center,
      },
    },
  },
}
