import { useConnectStore } from 'state/useConnectStore'

export function useConnectModal() {
  const coreStore = useConnectStore((state) => state)

  return {
    open: coreStore.open,
    openModal: coreStore.openModal,
    closeModal: coreStore.closeModal,
  }
}
