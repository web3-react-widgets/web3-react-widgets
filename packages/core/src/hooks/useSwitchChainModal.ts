import { useSwitchChainStore } from 'state/useSwitchChainStore'

export function useSwitchChainModal() {
  const coreStore = useSwitchChainStore((state) => state)

  return {
    openSwitchChain: coreStore.openSwitchChain,
    openSwitchChainModal: coreStore.openSwitchChainModal,
    closeSwitchChainModal: coreStore.closeSwitchChainModal,
    chainIds: coreStore.chainIds,
    setChainIds: coreStore.setChainIds,
  }
}
