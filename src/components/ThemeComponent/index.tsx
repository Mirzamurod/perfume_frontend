// React Import
import { Fragment, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

// React-i18next
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { us, ru, uz } from '@/languages'

// Store
import { RootState } from '@/store'

// chakra ui
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { ToastContainer } from 'react-toastify'

if (typeof window !== 'undefined')
  i18next.use(initReactI18next).init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      us: { translation: us },
    },
    lng: JSON.parse(window.localStorage.getItem('lang')!)?.lang ?? 'us',
    fallbackLng: 'us',
    interpolation: { escapeValue: false },
  })

const ThemeComponent = ({ children }: { children: ReactNode }) => {
  const { mode } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (!localStorage.getItem('lang'))
      localStorage.setItem('lang', JSON.stringify({ lang: 'us', name: 'Eng' }))
  }, [])

  return (
    <Fragment>
      <ChakraProvider theme={theme}>
        {children}
        <ToastContainer theme={mode} position='top-right' />
      </ChakraProvider>
    </Fragment>
  )
}

export default ThemeComponent
