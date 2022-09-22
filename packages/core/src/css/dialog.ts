import { css } from 'styled-components/macro'

export const dialogCss = css`
  :root {
    --reach-dialog: 1;
  }

  [data-reach-dialog-overlay] {
    background: hsla(0, 0%, 0%, 0.33);
    bottom: 0;
    left: 0;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
  }

  [data-reach-dialog-content] {
    background: white;
    margin: 10vh auto;
    outline: none;
    padding: 2rem;
    width: 50vw;
  }
`
