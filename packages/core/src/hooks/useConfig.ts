import { Connection, connections, ConnectionType } from 'connection'
import { ChainInfoMap, getChainInfo } from 'constants/chainInfo'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { useCallback } from 'react'

export type ChainConfigInfo = {
  chainId: SupportedChainId
} & ChainInfoMap

export function useConfig() {
  const chainList = useCallback(() => {
    const dataList: ChainConfigInfo[] = []
    ALL_SUPPORTED_CHAIN_IDS.forEach((item) => {
      dataList.push({ chainId: item, ...getChainInfo(item) })
    })
    return dataList
  }, [])

  const connectionList = useCallback(() => {
    const dataList: Connection[] = []
    Object.keys(connections).forEach((item) => {
      dataList.push(connections[item as ConnectionType])
    })
    return dataList
  }, [])

  return {
    chainList,
    connectionList,
  }
}
