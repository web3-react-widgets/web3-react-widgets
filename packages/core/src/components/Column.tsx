import styled, { css } from 'styled-components/macro'
export interface ColumnProps {
  align?: string
  justify?: string
  gap?: number
  padded?: true
  flex?: true
  grow?: true
  css?: ReturnType<typeof css>
}

export const Column = styled.div<ColumnProps>`
  align-items: ${({ align }) => align ?? 'center'};
  display: ${({ flex }) => (flex ? 'flex' : 'grid')};
  flex-direction: column;
  flex-grow: ${({ grow }) => grow && 1};
  gap: ${({ gap }) => gap && `${gap}em`};
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-content: ${({ justify }) => justify ?? 'space-between'};
  padding: ${({ padded }) => padded && '0.75em'};

  ${({ css }) => css}
`
