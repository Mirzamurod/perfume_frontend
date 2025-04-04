// React Import
import { FC, Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface GuestGuard {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard: FC<GuestGuard> = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  // const { user } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // if (window.localStorage.getItem('token')) {
    //   router.replace('/')
    // }
  }, [router.route])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    // if (auth.loading) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default GuestGuard
