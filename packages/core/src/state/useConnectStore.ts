import create from 'zustand'

export type ConnectStoreProps = {
  open: boolean
  openModal: () => void
  closeModal: () => void
}

export const useConnectStore = create<ConnectStoreProps>((set) => ({
  open: false,
  openModal: () => set((state: { open: boolean }) => ({ open: true })),
  closeModal: () => set((state: { open: boolean }) => ({ open: false })),
}))
