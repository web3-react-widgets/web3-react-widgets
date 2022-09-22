import { BACKFILLABLE_WALLETS, ConnectionType } from 'connection/index'
import { getConnection } from 'connection/utils'
import { useMemo } from 'react'

export default function useOrderedConnections() {
  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = []

    orderedConnectionTypes.push(...BACKFILLABLE_WALLETS)

    return orderedConnectionTypes.map(getConnection)
  }, [])
}
