import { connections, ConnectionType } from 'connection'
import { getConnection } from 'connection/utils'
import { useWeb3Provider } from 'hooks/useWeb3Provider'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ExplorerDataType } from 'utils/getExplorerLink'

import { Button } from './Button'
import { Card } from './Card'
import { CopyHelper } from './CopyHelper'
import { Dialog } from './Dialog'
import { Image } from './Image'
import { Label } from './Label'
import { Row } from './Row'
import ScanLink from './ScanLink'

export type ConnectWalletProps = {
  visible: boolean
  close: () => void
}

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.container};
  margin-bottom: 12px;
  padding: 12px 16px;
`

const WalletAccount = styled.div`
  border: 1px solid ${({ theme }) => theme.outline};
  border-radius: 8px;
  display: grid;
  gap: 12px;
  padding: 12px;
`

export function ConnectWalletContent({ visible, close }: ConnectWalletProps) {
  const { account, isActive, connector, connectProvider } = useWeb3Provider()

  const onClose = useCallback(() => {
    close?.()
  }, [close])

  const connectionList = useMemo(() => {
    const data = []
    for (const key in connections) {
      data.push(connections[key as ConnectionType])
    }
    return data
  }, [])

  const connectType = useMemo(() => {
    return connector && isActive ? getConnection(connector).type : ''
  }, [connector, isActive])

  const connectName = useMemo(() => {
    return connector ? isActive && connectType && connections[connectType].name : ''
  }, [connectType, connector, isActive])

  const onDeactivate = useCallback(() => {
    if (connector.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
    onClose()
  }, [connector, onClose])

  return (
    <Dialog visible={true} title={isActive && account ? 'Account' : 'Connect Wallet'} close={onClose}>
      {isActive && account ? (
        <>
          <WalletAccount>
            <Row>
              <Label type="secondary">Connected with {connectName}</Label>
              <Button onClick={onDeactivate} radius="20px" plain={true} autoSize={true}>
                <Label type="accent" size="10px">
                  Deconnect
                </Label>
              </Button>
            </Row>
            <Row gap="0.5" justify="flex-start">
              {connectType && <Image src={connections[connectType].icon} width="16px" height="16px"></Image>}
              <Label size="16px">
                {account.substring(0, 6) + '...' + account.substring(account.length - 6, account.length)}
              </Label>
            </Row>
            <Row justify="flex-start" gap={1}>
              <CopyHelper
                data={account}
                suffix={
                  <Label underline={true} type="secondary" size="12px">
                    Copy Address
                  </Label>
                }
              ></CopyHelper>
              <Row gap="0.5">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path
                    d="M832 128H640v64h146.752L521.376 457.376l45.248 45.248L832 237.248V384h64V128z"
                    fill="#181818"
                  ></path>
                  <path
                    d="M768 832H192V256h352v-64H160a32 32 0 0 0-32 32v640a32 32 0 0 0 32 32h640a32 32 0 0 0 32-32V480h-64v352z"
                    fill="#181818"
                  ></path>
                </svg>
                <ScanLink data={account} type={ExplorerDataType.ADDRESS}>
                  <Label type="secondary" size="12px">
                    View on Scan
                  </Label>
                </ScanLink>
              </Row>
            </Row>
          </WalletAccount>
        </>
      ) : (
        <>
          {connectionList.map((item) => (
            <StyledCard
              hover={true}
              onClick={async () => {
                await connectProvider(item.type)
                onClose()
              }}
              key={item.name}
            >
              <Row>
                <Row>
                  <span>{item.name}</span>
                </Row>
                <Image src={item.icon} width="24px" height="24px"></Image>
              </Row>
            </StyledCard>
          ))}
        </>
      )}
    </Dialog>
  )
}

export function ConnectWallet(props: ConnectWalletProps) {
  return <>{props.visible && <ConnectWalletContent {...props} />}</>
}
