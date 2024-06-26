// React Imports
import { Fragment, ReactNode } from 'react'

// Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

// Next-i18next
import { appWithTranslation } from 'next-i18next'

// Loader Import
import NextNProgress from 'nextjs-progressbar'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import BlankLayoutWithSidebar from '@/components/layout/BlankLayoutWithSidebar'
import { store } from '@/store'
import { Provider } from 'react-redux'
import GuestGuard from '@/components/auth/GuestGuard'
import AuthGuard from '@/components/auth/AuthGuard'
import ThemeComponent from '@/components/ThemeComponent'
import WindowWrapper from '@/components/window-wrapper'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Loading from '@/components/Loading'

// Css
import 'react-toastify/dist/ReactToastify.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import '@/styles/globals.scss'

type ExtendedAppProps = AppProps & {
  Component: NextPage
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Loading />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <Fragment>{children}</Fragment>
  } else {
    return <AuthGuard fallback={<Loading />}>{children}</AuthGuard>
  }
}

// Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  // Variables
  // const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <BlankLayoutWithSidebar>{page}</BlankLayoutWithSidebar>)

  // const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  return (
    <Provider store={store}>
      <Head>
        <title>Eltop</title>
        <meta name='description' />
        <link rel='icon' href='/eltop.png' />
        <meta name='keywords' content='Eltop, eltop, ...' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <LanguageProvider>
        <AuthProvider>
          <ThemeComponent>
            <WindowWrapper>
              <Guard authGuard={authGuard} guestGuard={guestGuard}>
                <NextNProgress color={themeConfig.themeColor} />
                <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>
              </Guard>
            </WindowWrapper>
          </ThemeComponent>
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  )
}

export default appWithTranslation(App)
