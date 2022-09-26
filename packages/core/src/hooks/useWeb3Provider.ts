import { useWeb3React } from '@web3-react/core'
import { connections, ConnectionType } from 'connection'
import { switchChain as switchNetwork } from 'connection/utils'
import { useCallback, useEffect } from 'react'

export function useWeb3Provider() {
  const web3 = useWeb3React()
  const { connector, account, chainId } = web3

  const connectProvider = useCallback(async (conntionType: ConnectionType) => {
    try {
      // ...
      await connections[conntionType]?.connector?.activate?.()
      return true
    } catch (error) {
      return false
    }
  }, [])

  const switchChain = useCallback(
    async (chainId: number) => {
      if (!connector) return
      try {
        await switchNetwork(connector, chainId, account)
        return true
      } catch (error) {
        console.error('Failed to switch networks', error)
        return false
      }
    },
    [account, connector]
  )

  useEffect(() => {
    if (chainId) {
      connector.activate(chainId)
    }
  }, [chainId, connector])

  return {
    ...web3,
    connectProvider,
    switchChain,
  }
}
