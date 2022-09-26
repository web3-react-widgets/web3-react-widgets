import create from 'zustand'

export type ConnectStoreProps = {
  openConnect: boolean
  openConnectModal: () => void
  closeConnectModal: () => void
}

export const useConnectStore = create<ConnectStoreProps>((set) => ({
  openConnect: false,
  openConnectModal: () => set((state: { openConnect: boolean }) => ({ openConnect: true })),
  closeConnectModal: () => set((state: { openConnect: boolean }) => ({ openConnect: false })),
}))
