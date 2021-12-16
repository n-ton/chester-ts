export enum ScrollLogicalPosition {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Nearest = 'nearest',
}
export enum ScrollBehavior {
  Auto = 'auto',
  Smooth = 'smooth',
}

export interface IDebugConfig {
  highlight: {
    enable: boolean
    styleBorder: string
  }
  delay: {
    enable: boolean
    time: number
  }
  scrollIntoView: {
    options: {
      behavior: ScrollBehavior
      block: ScrollLogicalPosition
      inline: ScrollLogicalPosition
    }
  }
}
