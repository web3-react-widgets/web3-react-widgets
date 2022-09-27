import { useSwitchChainStore } from 'state/useSwitchChainStore'

export function useSwitchChainModal() {
  const coreStore = useSwitchChainStore((state) => state)

  return {
    open: coreStore.open,
    openModal: coreStore.openModal,
    closeModal: coreStore.closeModal,
    chainIds: coreStore.chainIds,
    setChainIds: coreStore.setChainIds,
  }
}
