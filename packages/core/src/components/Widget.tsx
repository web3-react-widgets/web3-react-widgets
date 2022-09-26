import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { Connection } from 'connection'
import { getConnectionName } from 'connection/utils'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale } from 'constants/locales'
import useOrderedConnections from 'hooks/useOrderedConnections'
import { Provider as I18nProvider } from 'i18n'
import { ReactNode, useMemo } from 'react'
import { Theme, ThemeProvider } from 'theme'

import { ConnectWallet } from './ConnectWallet'
import { SwitchChain } from './SwitchChain'

export type Web3ProvderProps = {
  theme?: Theme
  locale?: SupportedLocale
  children: ReactNode
}

export default function Web3Provider(props: Web3ProvderProps) {
  const connections = useOrderedConnections()
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }: any) => [connector, hooks])

  const key = useMemo(() => connections.map(({ type }: Connection) => getConnectionName(type)).join('-'), [connections])

  const locale = useMemo(() => {
    if (props.locale && ![...SUPPORTED_LOCALES, 'pseudo'].includes(props.locale)) {
      console.warn(`Unsupported locale: ${props.locale}. Falling back to ${DEFAULT_LOCALE}.`)
      return DEFAULT_LOCALE
    }
    return props.locale ?? DEFAULT_LOCALE
  }, [props.locale])

  return (
    <ThemeProvider theme={props.theme}>
      <I18nProvider locale={locale}>
        <Web3ReactProvider connectors={connectors} key={key} network={undefined}>
          {props.children}

          <ConnectWallet></ConnectWallet>
          <SwitchChain></SwitchChain>
        </Web3ReactProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
