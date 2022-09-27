# @web3widgets/react
  
  Provider link library based on web3-react package

### Using

  ```typescript
  import { Web3ProviderWidget } from '@web3-react-widgets/core'

  <Web3ProviderWidget theme={{ accent: '#8714c0', zIndex: 10000 }}>
    <App />
  </Web3ProviderWidget>
  ```

### Use the default Modal

- useConnectModal

  ```typescript
  type ConnectStoreProps = {
    open: boolean
    openModal: () => void
    closeModal: () => void
  }

  import { foramtAddress, useConnectModal, useWeb3Provider } from '@web3-react-widgets/core'

  function ConnectButton() {
    const { account, isActive } = useWeb3Provider()

    const { openModal } = useConnectModal()

    return (
      <button  onClick={() => openModal()}>
        {!isActive || !account ? 'Connect Wallet' : foramtAddress(account)}
      </button>
    )
  }
  ```

- useSwitchChainModal: Switch Chain

  ```typescript
  type SwitchChainStoreProps = {
    open: boolean
    openModal: () => void
    closeModal: () => void
    chainIds?: SupportChainId[]
    setChainIds: (chainIds: SupportChainId[]) => void
  }

  import { getChainInfo, useSwitchChainModal, useWeb3Provider } from '@web3-react-widgets/core'

  function SwitchChainButton() {
    const { account, chainId, isActive } = useWeb3Provider()

    const { openModal, setChainIds } = useSwitchChainModal()

    useEffect(() => {
      setChainIds([1, 56])
    }, [setChainIds])

    return (
    <button onClick={() => openModal()}>
        {isActive && chainId ? getChainInfo(chainId).label : 'Switch Chain'}
      </button>
    )
  }
  ```

### Custom Connect

```typescript
import { useWeb3Provider, SupportChainId, ConnectionType } from '@web3-react-widgets/core'

const { switchChain, connect } = useWeb3Provider()

switchChain(SupportedChainId.GOERLI)

connect(ConnectionType.INJECTED)
```

### useConfig

```typescript
import { useConfig } from '@web3-react-widgets/core'

// ChainConfigInfo[] | Connection[]
const { chainList, connectionList } = useConfig()
```