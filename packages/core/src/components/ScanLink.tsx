import { SupportedChainId } from 'constants/chains'
import { useWeb3Provider } from 'hooks/useWeb3Provider'
import { ReactNode, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

import ExternalLink from './Link'

const StyledExternalLink = styled(ExternalLink)<{ color: string }>`
  color: ${({ color }) => color};
  text-decoration: none;
`

interface ScanProps {
  type: ExplorerDataType
  data?: string
  color?: string
  children: ReactNode
}

export default function ScanLink({ data, type, color, children }: ScanProps) {
  const { chainId } = useWeb3Provider()
  const url = useMemo(
    () => data && getExplorerLink(chainId || SupportedChainId.MAINNET, data, type),
    [chainId, data, type]
  )

  return (
    <StyledExternalLink href={url} color={color} target="_blank" underline="true">
      {children}
    </StyledExternalLink>
  )
}
