export interface Colors {
  // surface
  accent: string
  container: string
  module: string
  interactive: string
  outline: string
  dialog: string

  // text
  primary: string
  onAccent: string
  secondary: string
  hint: string
  onInteractive: string

  // state
  active: string
  success: string
  warning: string
  error: string

  zIndex: number

  currentColor: 'currentColor'
}

export type Color = keyof Colors

export interface Attributes {
  borderRadius: boolean | number
  fontFamily:
    | string
    | {
        font: string
        variable: string
      }
  fontFamilyCode: string
}

export interface Theme extends Partial<Attributes>, Partial<Colors> {}
