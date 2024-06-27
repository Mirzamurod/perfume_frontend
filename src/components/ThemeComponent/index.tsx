// React Import
import { ReactNode, useEffect } from 'react'

// React-i18next
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { us, ru, uz } from '@/languages'

// Store

// chakra ui
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

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
  useEffect(() => {
    if (!localStorage.getItem('lang'))
      localStorage.setItem('lang', JSON.stringify({ lang: 'us', name: 'Eng' }))
  }, [])

  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { isClosable: true, position: 'top-right' } }}
    >
      {children}
    </ChakraProvider>
  )
}

export default ThemeComponent
