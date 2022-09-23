import 'polyfills'

import Web3Provider, { Web3ProvderProps } from 'components/Widget'

export type { Provider as EthersProvider } from '@ethersproject/abstract-provider'
export type { JsonRpcProvider } from '@ethersproject/providers'
export type { Provider as Eip1193Provider } from '@web3-react/types'
export { ConnectWallet } from 'components/ConnectWallet'
export { SwitchChain } from 'components/SwitchChain'
export type { Connection } from 'connection'
export { connections, ConnectionType } from 'connection'
export * from 'connection/utils'
export * from 'constants/chainInfo'
export { ChainName, SupportedChainId } from 'constants/chains'
export type { SupportedLocale } from 'constants/locales'
export { DEFAULT_LOCALE, SUPPORTED_LOCALES } from 'constants/locales'
export { useWeb3Provider } from 'hooks/useWeb3Provider'

export function Web3ProviderWidget(props: Web3ProvderProps) {
  return <Web3Provider {...props}></Web3Provider>
}
