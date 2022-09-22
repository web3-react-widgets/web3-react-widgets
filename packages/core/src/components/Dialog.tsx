import { DialogContent, DialogOverlay } from '@reach/dialog'
import { animated, useTransition } from '@react-spring/web'
import { memo, ReactNode } from 'react'
import styled from 'styled-components/macro'
import { ThemeProvider } from 'theme'

const StyledDialogOverlay = styled(DialogOverlay)`
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  background: hsla(0, 0%, 0%, 0.33);
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;

  * {
    box-sizing: border-box;
  }
`

const StyleddDialogContent = styled(DialogContent)`
  align-self: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(247, 248, 250) !important;
  border-radius: 20px;
  box-shadow: rgb(47 128 237 / 5%) 0px 4px 8px 0px;
  display: flex;
  flex-direction: column;
  margin: 10vh auto;
  max-height: 90vh;
  max-width: 420px;
  outline: none;
  padding: 1rem;
  width: 50vw;
`

const DialogHeader = styled.div`
  align-items: center;
  color: #333333;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  padding-bottom: 1rem;
  width: 100%;
`

const DialogBody = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden auto;
  width: 100%;
`

type DialogProps = {
  visible?: boolean
  title?: string | ReactNode
  center?: boolean
  width?: string
  children: ReactNode
  footer?: boolean
  top?: string
  disabledConfirm?: boolean
  confirmText?: string | ReactNode
  confirm?: () => void
  close: () => void
}

export function DialogEntry({ visible, title, children, close }: DialogProps) {
  const AnimatedDialogOverlay = animated(StyledDialogOverlay)
  const AnimatedDialogContent = animated(StyleddDialogContent)

  const transitions = useTransition(visible, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  })

  return (
    <>
      <ThemeProvider>
        {transitions(
          (styles, item) =>
            item && (
              <AnimatedDialogOverlay isOpen={visible} style={{ opacity: styles.opacity }}>
                <AnimatedDialogContent
                  style={{
                    transform: styles.y.to((value) => `translate3d(0px, ${value}px, 0px)`),
                    border: '4px solid hsla(0, 0%, 0%, 0.5)',
                    borderRadius: 10,
                  }}
                  aria-label="Dialog"
                >
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
                        close?.()
                      }}
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </DialogHeader>
                  <DialogBody>{children}</DialogBody>
                </AnimatedDialogContent>
              </AnimatedDialogOverlay>
            )
        )}
      </ThemeProvider>
    </>
  )
}

const DialogEntryMemo = memo(DialogEntry)

export function Dialog(props: DialogProps) {
  const { visible = true } = props
  return <>{visible && <DialogEntryMemo {...props} />}</>
}
