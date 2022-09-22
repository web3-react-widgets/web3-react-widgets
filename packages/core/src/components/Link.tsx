import { HTMLProps } from 'react'
import styled from 'styled-components/macro'

export type LinkProps = Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href?: string } & {
  size?: string
  color?: string
  weight?: number
  underline?: boolean
}

export const Link = styled.a<LinkProps>`
  border: none;
  color: ${({ color }) => color || '#363636'};
  font-size: ${({ size }) => size || '14px'};
  font-weight: ${({ weight }) => weight || 400};

  &:hover {
    ${({ underline }) => (underline ? 'text-decoration: underline; cursor: pointer;' : '')}
  }
`

/**
 * Outbound link
 */
export default function ExternalLink({ target = '_blank', href, rel = 'noopener noreferrer', ...rest }: LinkProps) {
  return (
    <Link target={target} rel={rel} href={href} {...rest}>
      {rest.children}
    </Link>
  )
}
