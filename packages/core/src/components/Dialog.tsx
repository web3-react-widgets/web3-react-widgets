import { rgba } from 'polished'
import { ReactNode, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/macro'
import { ThemeProvider } from 'theme'

const DialogMasklayer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => rgba(theme.onInteractive, 0.4)};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: ${({ theme }) => theme.zIndex};

  * {
    box-sizing: border-box;
  }
`

type DialogContentProps = {
  width?: string
}

const DialogContent = styled.div<DialogContentProps>`
  background-color: ${({ theme }) => theme.dialog};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  padding: 1rem;
  width: ${({ width }) => width ?? '50%'};
`

const DialogHeader = styled.div`
  align-items: center;
  color: #333333;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  min-height: 2rem;
  overflow-y: auto;
  padding-bottom: 1rem;
  width: 100%;
`

const DialogBody = styled.div`
  flex: 1;
  overflow-y: auto;
`

export type DialogProps = {
  open?: boolean
  title?: ReactNode | string
  onClose: () => void
  children: ReactNode
}

export function DialogEntry(props: DialogProps) {
  const { title, onClose, children } = props

  const close = useCallback(() => {
    onClose?.()
  }, [onClose])

  return (
    <DialogMasklayer>
      <DialogContent>
        <DialogHeader>
          <span>{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#333333"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              close()
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
      </DialogContent>
    </DialogMasklayer>
  )
}

export function Dialog(props: DialogProps) {
  return (
    <>
      {props.open && (
        <ThemeProvider>{createPortal(<DialogEntry {...props}></DialogEntry>, document.body)}</ThemeProvider>
      )}
    </>
  )
}
