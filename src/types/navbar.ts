import { IconType } from 'react-icons/lib'

export type TNavbar = {
  type: 'link'
  label: string
  icon: IconType
  path?: string
  notifications?: number
}
