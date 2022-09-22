import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components/macro'

export interface RowProps {
  align?: string
  justify?: string
  pad?: number
  gap?: number
  flex?: true
  grow?: true | 'first' | 'last'
  css?: ReturnType<typeof css>
  children?: ReactNode
}

export const Row = styled.div<RowProps>`
  align-items: ${({ align }) => align ?? 'center'};
  display: ${({ flex }) => (flex ? 'flex' : 'grid')};
  flex-flow: wrap;
  flex-grow: ${({ grow }) => grow && 1};
  gap: ${({ gap }) => gap && `${gap}em`};
  grid-auto-flow: column;
  grid-template-columns: ${({ grow, children }) => {
    if (grow === 'first') return '1fr'
    if (grow === 'last') return `repeat(${Children.count(children) - 1}, auto) 1fr`
    if (grow) return `repeat(${Children.count(children)}, 1fr)`
    return undefined
  }};
  justify-content: ${({ justify }) => justify ?? 'space-between'};
  padding: ${({ pad }) => pad && `0 ${pad}em`};

  ${({ css }) => css}
`
