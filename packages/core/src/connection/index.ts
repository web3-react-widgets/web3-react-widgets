import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import MetamaskIcon from 'assets/images/metamaskIcon.png'
import CoinbaseIcon from 'assets/svg/coinbase.svg'
import WalletConnectIcon from 'assets/svg/walletConnectIcon.svg'
import { SupportedChainId } from 'constants/chains'
import { RPC_URLS } from 'constants/networks'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
}

export const BACKFILLABLE_WALLETS = [
  ConnectionType.INJECTED,
  ConnectionType.COINBASE_WALLET,
  ConnectionType.WALLET_CONNECT,
]

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
  name?: string
  icon?: string
}

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }))
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: RPC_URLS,
        qrcode: true,
      },
      onError,
    })
)
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
}

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: RPC_URLS[SupportedChainId.MAINNET],
        appName: 'Uniswap',
        appLogoUrl: '',
        reloadOnDisconnect: false,
      },
      onError,
    })
)
export const coinbaseWalletConnection: Connection = {
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
}

export const connections: { [key in ConnectionType]: Connection } = {
  [ConnectionType.INJECTED]: {
    name: 'MetaMask',
    icon: MetamaskIcon,
    ...injectedConnection,
  },
  [ConnectionType.COINBASE_WALLET]: { name: 'Coinbase Walet', icon: CoinbaseIcon, ...coinbaseWalletConnection },
  [ConnectionType.WALLET_CONNECT]: { name: 'Wallet Connect', icon: WalletConnectIcon, ...walletConnectConnection },
}
