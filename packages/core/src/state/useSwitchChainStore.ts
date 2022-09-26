import { SupportedChainId } from 'constants/chains'
import create from 'zustand'

export type SwitchChainStoreProps = {
  chainIds?: SupportedChainId[]
  openSwitchChain: boolean
  openSwitchChainModal: () => void
  closeSwitchChainModal: () => void
  setChainIds: (chainIds: SupportedChainId[]) => void
}

export const useSwitchChainStore = create<SwitchChainStoreProps>((set) => ({
  openSwitchChain: false,
  openSwitchChainModal: () => set(() => ({ openSwitchChain: true })),
  closeSwitchChainModal: () => set(() => ({ openSwitchChain: false })),
  chainIds: undefined,
  setChainIds: (chainIds) => set((state) => ({ chainIds })),
}))
