import { SupportedChainId } from 'constants/chains'
import create from 'zustand'

export type SwitchChainStoreProps = {
  chainIds?: SupportedChainId[]
  open: boolean
  openModal: () => void
  closeModal: () => void
  setChainIds: (chainIds: SupportedChainId[]) => void
}

export const useSwitchChainStore = create<SwitchChainStoreProps>((set) => ({
  open: false,
  openModal: () => set(() => ({ open: true })),
  closeModal: () => set(() => ({ open: false })),
  chainIds: undefined,
  setChainIds: (chainIds) => set((state) => ({ chainIds })),
}))
