import {
  ConnectionType,
  foramtAddress,
  getChainInfo,
  useConnectModal,
  useSwitchChainModal,
  useWeb3Provider,
  Web3ProviderWidget,
} from '@web3-react-widgets/core'
import { Button } from 'components/Button'
import { Row } from 'components/Row'
import { SupportedChainId } from 'constants/chains'
import { useEffect } from 'react'
import styled from 'styled-components/macro'

const WidgetWrapper = styled.div`
  font-size: 16px;
  padding: 12px;
`

const WidgetModule = styled.div`
  margin-bottom: 12px;
`
function ConnectButton() {
  const { account, isActive } = useWeb3Provider()

  const { openModal } = useConnectModal()
  return (
    <Button size="small" onClick={() => openModal()}>
      {!isActive || !account ? 'Connect Wallet' : foramtAddress(account)}
    </Button>
  )
}

function SwitchChainButton() {
  const { account, isActive, chainId } = useWeb3Provider()

  const { openModal, setChainIds } = useSwitchChainModal()

  useEffect(() => {
    setChainIds([1, 56])
  }, [setChainIds])

  return (
    <>
      {isActive && account && (
        <>
          <Button size="small" onClick={() => openModal()}>
            {isActive && chainId ? getChainInfo(chainId).label : 'Switch Chain'}
          </Button>
        </>
      )}
    </>
  )
}

function WidgetContent() {
  const { switchChain, connect } = useWeb3Provider()

  return (
    <>
      <WidgetWrapper>
        <WidgetModule>
          <h3>Default Connect</h3>
          <Row gap={1} justify="flex-start">
            <ConnectButton></ConnectButton>
            <SwitchChainButton></SwitchChainButton>
            {/* <Button size="small" onClick={() => openConnectModal()}>
              Open Wallet Modal
            </Button> */}
          </Row>
          <h3>Custom Connect</h3>
          <Row gap={1} justify="flex-start" style={{ marginTop: '1rem' }}>
            <Button size="small" onClick={() => connect(ConnectionType.INJECTED)}>
              Connect Metamask
            </Button>
            <Button size="small" onClick={() => switchChain(SupportedChainId.GOERLI)}>
              Switch Chain (Görli)
            </Button>
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
