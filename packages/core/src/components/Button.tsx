import { rgba } from 'polished'
import { ReactNode, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'

export type ButtonProps = {
  radius?: string
  width?: string
  css?: ReturnType<typeof css>
  size?: 'small' | 'default' | 'medium'
  autoSize?: boolean
  plain?: boolean
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
}

export const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ plain, theme }) => (plain ? 'transparent' : theme.accent)};
  border: 1px solid ${({ plain, theme }) => (plain ? theme.outline : theme.accent)};
  border-radius: ${({ radius }) => radius ?? '8px'};
  color: ${({ plain, theme }) => (plain ? theme.accent : theme.onAccent)};
  cursor: pointer;
  font-size: 14px;
  height: ${({ size, autoSize }) =>
    !autoSize ? { small: '32px', default: '48px', medium: '60px' }[size || 'default'] : ''};

  padding: 4px 6px;
  text-align: center;
  width: ${({ width }) => width ?? 'inherit'};

  &:hover {
    background-color: ${({ plain, theme }) => (plain ? 'transparent' : rgba(theme.accent, 0.9))};
    border-color: ${({ plain, theme }) => (plain ? theme.accent : '')};
  }

  ${({ css }) => css}
`

export function Button(props: ButtonProps) {
  const onTap = useCallback(() => {
    !props.disabled && props?.onClick?.()
  }, [props])
  return <StyledButton {...props} onClick={onTap}></StyledButton>
}
