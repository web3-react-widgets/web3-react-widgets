import { useConnectModal, useSwitchChainModal, useWeb3Provider, Web3ProviderWidget } from '@web3-react-widgets/core'
import { Button } from 'components/Button'
import { Row } from 'components/Row'
import { useEffect } from 'react'
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

  const { openConnectModal } = useConnectModal()
  const { openSwitchChainModal, setChainIds } = useSwitchChainModal()

  useEffect(() => {
    setChainIds([1, 56])
  }, [setChainIds])

  return (
    <>
      <WidgetWrapper>
        <WidgetModule>
          <Row gap={1} justify="flex-start">
            <Button size="small" onClick={() => openConnectModal()}>
              {!isActive || !account
                ? 'Connect Wallet'
                : account.substring(0, 6) + '...' + account.substring(account.length - 6, account.length)}
            </Button>
            {isActive && account && (
              <>
                <Button size="small" onClick={() => openSwitchChainModal()}>
                  Switch Chain
                </Button>
              </>
            )}
            {/* <Button size="small" onClick={() => openConnectModal()}>
              Open Wallet Modal
            </Button> */}
          </Row>
        </WidgetModule>
      </WidgetWrapper>
      {/* <ConnectWallet open={openConnectWallet} close={() => setOpenConnectWallet(false)}></ConnectWallet>
      <SwitchChain open={openSwitchChain} close={() => setOpenSwitchChain(false)}></SwitchChain> */}
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
