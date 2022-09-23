import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import optimismLogoUrl from 'assets/svg/optimistic_ethereum.svg'
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg'

import { SupportedChainId } from './chains'

export const BscIcon = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg'
export const FtmICON = 'https://exchange.biswap.org/images/coins/ftm.svg'

export interface BaseChainInfo {
  readonly blockWaitMsBeforeWarning?: number
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo }

const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    explorer: 'https://etherscan.io',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    explorer: 'https://rinkeby.etherscan.io',
    label: 'Rinkeby',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    explorer: 'https://ropsten.etherscan.io',
    label: 'Ropsten',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    explorer: 'https://goerli.etherscan.io',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  [SupportedChainId.BSC]: {
    explorer: 'https://bscscan.com',
    label: 'BSC',
    logoUrl: BscIcon,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  [SupportedChainId.BSC_TESTNET]: {
    explorer: 'https://testnet.bscscan.com',
    label: 'BSC Testnet',
    logoUrl: BscIcon,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  [SupportedChainId.FTM]: {
    explorer: 'https://ftmscan.com',
    label: 'Fantom',
    logoUrl: FtmICON,
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
  },
  [SupportedChainId.FTM_TESTNET]: {
    explorer: 'https://testnet.ftmscan.com',
    label: 'Fantom Testnet',
    logoUrl: FtmICON,
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    explorer: 'https://optimistic.etherscan.io',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    explorer: 'https://optimistic.etherscan.io',
    label: 'Optimistic Kovan',
    logoUrl: optimismLogoUrl,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Optimistic Kovan Ether', symbol: 'OpETH', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    explorer: 'https://arbiscan.io',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    explorer: 'https://rinkeby-explorer.arbitrum.io',
    label: 'Arbitrum Rinkeby',
    logoUrl: arbitrumLogoUrl,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Rinkeby Arbitrum Ether', symbol: 'ArbETH', decimals: 18 },
  },
  [SupportedChainId.POLYGON]: {
    explorer: 'https://polygonscan.com',
    label: 'Polygon',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    explorer: 'https://mumbai.polygonscan.com',
    label: 'Polygon Mumbai',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 },
  },
}

export function getChainInfo(chainId: SupportedChainId | number | undefined): BaseChainInfo

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * SupportedChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

export const MAINNET_INFO = CHAIN_INFO[SupportedChainId.MAINNET]
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO
}
