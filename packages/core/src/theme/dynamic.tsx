import { darken, lighten, opacify, transparentize } from 'polished'
import { readableColor } from 'polished'
import { ReactNode, useMemo } from 'react'
import { DefaultTheme, ThemeProvider as StyledProvider, useTheme } from 'styled-components/macro'
import { hex } from 'wcag-contrast'

import type { Colors } from './theme'

type DynamicColors = Pick<Colors, 'interactive' | 'outline' | 'primary' | 'secondary' | 'onInteractive'>

const black = 'hsl(0, 0%, 0%)'
const white = 'hsl(0, 0%, 100%)'

const light: DynamicColors = {
  // surface
  interactive: transparentize(1 - 0.54, black),
  outline: transparentize(1 - 0.24, black),

  // text
  primary: black,
  secondary: transparentize(1 - 0.64, black),
  onInteractive: white,
}

const dark: DynamicColors = {
  // surface
  interactive: transparentize(1 - 0.48, white),
  outline: transparentize(1 - 0.12, white),

  // text
  primary: white,
  secondary: transparentize(1 - 0.6, white),
  onInteractive: black,
}

export function getDynamicTheme(theme: DefaultTheme | undefined, color: string): DefaultTheme | undefined {
  if (!theme) return undefined
  const colors = { light, dark }[readableColor(color, 'light', 'dark', false) as 'light' | 'dark']
  return {
    ...theme,
    ...colors,
    module: color,
    onHover: (color: string) => (color === colors.primary ? transparentize(0.4, colors.primary) : opacify(0.25, color)),
  }
}

function getAccessibleColor(theme: DefaultTheme | undefined, color: string) {
  if (!theme) return ''
  const dynamic = getDynamicTheme(theme, color)
  if (!dynamic) return ''

  let { primary } = dynamic
  let AAscore = hex(color, primary)
  const contrastify = hex(color, '#000') > hex(color, '#fff') ? darken : lighten
  while (AAscore < 3) {
    color = contrastify(0.005, color)
    primary = getDynamicTheme(theme, color)?.primary || ''
    AAscore = hex(color, primary)
  }
  return color
}

interface DynamicThemeProviderProps {
  color?: string
  children: ReactNode
}

export function DynamicThemeProvider({ color, children }: DynamicThemeProviderProps) {
  const theme = useTheme()
  const value = useMemo(() => {
    if (!color) {
      return theme
    }

    const accessibleColor = getAccessibleColor(theme, color)
    return getDynamicTheme(theme, accessibleColor)
  }, [theme, color])
  return (
    <StyledProvider theme={value as DefaultTheme}>
      <div style={{ color: value?.primary }}>{children}</div>
    </StyledProvider>
  )
}
