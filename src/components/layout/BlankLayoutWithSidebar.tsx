import { FC } from 'react'
import { BlankLayoutWithAppBarProps } from '@/types/types'

const BlankLayoutWithSidebar: FC<BlankLayoutWithAppBarProps> = props => {
  const { children } = props

  return <div>{children}</div>
}

export default BlankLayoutWithSidebar
