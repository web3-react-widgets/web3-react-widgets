import { useWeb3React } from '@web3-react/core'
import { connections, ConnectionType } from 'connection'
import { switchChain as switchNetwork } from 'connection/utils'
import { useCallback } from 'react'

export function useWeb3Provider() {
  const web3 = useWeb3React()
  const { connector, account } = web3

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
        setTimeout(() => {
          if (account && chainId) {
            connector.activate(chainId)
          }
        }, 1200)
        return true
      } catch (error) {
        console.error('Failed to switch networks', error)
        return false
        // If we activate a chain and it fails, reset the query param to the current chainId
        // replaceURLChainParam()
      }
    },
    [account, connector]
  )

  return {
    ...web3,
    connectProvider,
    switchChain,
  }
}
