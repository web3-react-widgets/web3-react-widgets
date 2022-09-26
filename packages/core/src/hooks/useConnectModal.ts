import { useConnectStore } from 'state/useConnectStore'

export function useConnectModal() {
  const coreStore = useConnectStore((state) => state)

  return {
    openConnect: coreStore.openConnect,
    openConnectModal: coreStore.openConnectModal,
    closeConnectModal: coreStore.closeConnectModal,
  }
}
