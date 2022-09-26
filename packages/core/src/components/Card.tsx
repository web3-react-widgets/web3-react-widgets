import { rgba } from 'polished'
import styled from 'styled-components/macro'

export type CardProps = {
  padding?: string
  radius?: string
  border?: boolean
  hover?: 'true' | 'false'
  cursor?: string
}

export const Card = styled.div<CardProps>`
  border: ${(props) => (props.border === undefined || props.border ? '1px solid #cdcdcd' : 'none')};
  border-radius: ${(props) => props.radius || '8px'};
  cursor: ${(props) => props.cursor || 'pointer'};
  height: inherit;
  padding: ${(props) => props.padding || '12px'};
  width: 100%;

  &:hover {
    border-color: ${({ hover, theme }) => (hover === 'true' ? rgba(theme.onInteractive, 0.6) : '')};
  }
`
