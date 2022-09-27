import { Trans } from '@lingui/react'
import { CHAIN_NAMES_TO_IDS } from 'constants/chains'
import { useSwitchChainModal } from 'hooks/useSwitchChainModal'
import { useWeb3Provider } from 'hooks/useWeb3Provider'
import { rgba } from 'polished'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components/macro'

import { Card } from './Card'
import { Dialog } from './Dialog'
import { Label } from './Label'
import { Row } from './Row'

export type SwitchChainProps = {
  open?: boolean
  close?: () => void
  chainIds?: number[]
}

const ActivePoint = styled.div<{ active?: 'true' | 'false' }>`
  background-color: ${({ active, theme }) => (active === 'true' ? theme.success : rgba(theme.secondary, 0.2))};
  border-radius: 50%;
  height: 10px;
  margin-right: 10px;
  width: 10px;
`

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.container};
  margin-bottom: 12px;
  padding: 12px 16px;
`

export function SwitchChainContent({ chainIds, open, close }: SwitchChainProps) {
  const { chainId, switchChain } = useWeb3Provider()
  const { closeModal, chainIds: storeChainIds } = useSwitchChainModal()

  const onClose = useCallback(() => {
    close ? close() : closeModal()
    close?.()
  }, [close, closeModal])

  const chains = useMemo(() => {
    const data: { chainId: number; chainName: string }[] = []
    for (const key in CHAIN_NAMES_TO_IDS) {
      const ids = chainIds && chainIds.length > 0 ? chainIds : storeChainIds || []
      if (ids && ids.length > 0) {
        ids.includes(CHAIN_NAMES_TO_IDS[key]) &&
          data.push({
            chainId: CHAIN_NAMES_TO_IDS[key],
            chainName: key,
          })
      } else {
        data.push({
          chainId: CHAIN_NAMES_TO_IDS[key],
          chainName: key,
        })
      }
    }
    return data
  }, [chainIds, storeChainIds])

  const onSwitchChain = useCallback(
    async (chainIdValue: number) => {
      await switchChain(chainIdValue)
      onClose()
    },
    [onClose, switchChain]
  )

  return (
    // title={<Trans id="Switch Chain"></Trans>} width="40%" close={onClose} visible={visible}
    <Dialog open={open} title={<Trans id="Switch Chain"></Trans>} onClose={onClose}>
      {chains.map((item) => (
        <StyledCard
          hover={'true'}
          style={{ width: '100%' }}
          onClick={() => {
            onSwitchChain(item.chainId)
          }}
          key={item.chainId}
        >
          <Row style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Row style={{ alignItems: 'center' }}>
              <ActivePoint active={chainId === item.chainId ? 'true' : 'false'}></ActivePoint>
              <Label>{item.chainName}</Label>
            </Row>

            {/* <img src={item.icon} style={{ width: '24px', height: '24px' }} alt="" /> */}
          </Row>
        </StyledCard>
      ))}
    </Dialog>
  )
}

export function SwitchChain(props: SwitchChainProps) {
  const { open } = useSwitchChainModal()

  const visible = useMemo(() => {
    return open || props.open
  }, [open, props.open])

  return <>{visible && <SwitchChainContent {...props} open={visible} />}</>
}
