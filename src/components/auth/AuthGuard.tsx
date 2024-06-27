// React Imports
import { Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/router'

// Hooks Import
import { useAuth } from '@/hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  const { user } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (typeof window !== 'undefined') {
      if (user === null && !window.localStorage.getItem('perfume')!) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/',
            query: { returnUrl: router.asPath },
          })
        } else {
          router.replace('/')
        }
      }
    }
  }, [router.route])

  if (auth.loading || user === null) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default AuthGuard
