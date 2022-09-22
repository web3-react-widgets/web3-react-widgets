import { ConnectWallet, SwitchChain, useWeb3Provider, Web3ProviderWidget } from '@solv-protocol/web3-provider-widgets'
import { Button } from 'components/Button'
import { Row } from 'components/Row'
import { useState } from 'react'
import styled from 'styled-components/macro'

const WidgetWrapper = styled.div`
  font-size: 16px;
  padding: 12px;
`

const WidgetModule = styled.div`
  margin-bottom: 12px;
`

function WidgetContent() {
  const { account, isActive } = useWeb3Provider()

  const [openConnectWallet, setOpenConnectWallet] = useState(false)
  const [openSwitchChain, setOpenSwitchChain] = useState(false)

  return (
    <>
      <WidgetWrapper>
        <WidgetModule>
          <Row gap={1} justify="flex-start">
            <Button size="small" onClick={() => setOpenConnectWallet(true)}>
              {!isActive || !account
                ? 'Connect Wallet'
                : account.substring(0, 6) + '...' + account.substring(account.length - 6, account.length)}
            </Button>
            {isActive && account && (
              <>
                <Button size="small" onClick={() => setOpenSwitchChain(true)}>
                  Switch Chain
                </Button>
              </>
            )}
          </Row>
        </WidgetModule>
      </WidgetWrapper>
      <ConnectWallet visible={openConnectWallet} close={() => setOpenConnectWallet(false)}></ConnectWallet>
      <SwitchChain visible={openSwitchChain} close={() => setOpenSwitchChain(false)}></SwitchChain>
    </>
  )
}

export default function Widget() {
  return (
    <Web3ProviderWidget theme={{ accent: '#8714c0' }}>
      <WidgetContent></WidgetContent>
    </Web3ProviderWidget>
  )
}
