import { FC } from 'react'
import { IBlankLayoutWithSidebar } from '@/types/blankLayout'

const BlankLayoutWithSidebar: FC<IBlankLayoutWithSidebar> = props => {
  const { children } = props

  return <div>{children}</div>
}

export default BlankLayoutWithSidebar
