import styled from 'styled-components/macro'

export type LabelProps = {
  size?: string
  color?: string
  weight?: number
  underline?: 'true' | 'false'
  type?: 'accent' | 'primary' | 'secondary'
}

export const Label = styled.div<LabelProps>`
  color: ${({ theme, type }) => theme[type ?? 'primary']};
  font-size: ${({ size }) => size || '15px'};
  font-weight: ${({ weight }) => weight || 400};

  &:hover {
    ${({ underline }) => (underline === 'true' ? 'text-decoration: underline; cursor: pointer;' : '')}
  }
`
