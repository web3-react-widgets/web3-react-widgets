/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,

  BSC = 97,
  BSC_TESTNET = 56,

  FTM = 250,
  FTM_TESTNET = 4002,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
}

export enum ChainName {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten',
  RINKEBY = 'rinkeby',
  GOERLI = 'goerli',
  BSC = 'bsc',
  BSC_TESTNET = 'bsc-testnet',
  FTM = 'fantom',
  FTM_TESTNET = 'fantom-testnet',
  OPTIMISM = 'optimism-mainnet',
  OPTIMISTIC_KOVAN = 'optimism-kovan',
  ARBITRUM_ONE = 'arbitrum-mainnet',
  ARBITRUM_RINKEBY = 'arbitrum-rinkeby',
  POLYGON = 'polygon-mainnet',
  POLYGON_MUMBAI = 'polygon-mumbai',
}

export const CHAIN_NAMES_TO_IDS: { [chainName: string]: SupportedChainId } = {
  [ChainName.MAINNET]: SupportedChainId.MAINNET,
  [ChainName.ROPSTEN]: SupportedChainId.ROPSTEN,
  [ChainName.RINKEBY]: SupportedChainId.RINKEBY,
  [ChainName.GOERLI]: SupportedChainId.GOERLI,
  [ChainName.POLYGON]: SupportedChainId.POLYGON,
  [ChainName.BSC]: SupportedChainId.BSC,
  [ChainName.BSC_TESTNET]: SupportedChainId.BSC_TESTNET,
  [ChainName.FTM]: SupportedChainId.FTM,
  [ChainName.FTM_TESTNET]: SupportedChainId.FTM_TESTNET,
  [ChainName.POLYGON_MUMBAI]: SupportedChainId.POLYGON_MUMBAI,
  [ChainName.ARBITRUM_ONE]: SupportedChainId.ARBITRUM_ONE,
  [ChainName.ARBITRUM_RINKEBY]: SupportedChainId.ARBITRUM_RINKEBY,
  [ChainName.OPTIMISM]: SupportedChainId.OPTIMISM,
  [ChainName.OPTIMISTIC_KOVAN]: SupportedChainId.OPTIMISTIC_KOVAN,
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]
