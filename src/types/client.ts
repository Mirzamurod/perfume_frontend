import { TError } from './error'
import { TUserRole } from './user'

export type TClientState = {
  isLoading: boolean
  clients: TClient[]
  client: TClient | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TClient = {
  _id: string
  name?: string
  phone: string
  role: TUserRole
  block: boolean
}

export type TClientForm = {
  name?: string
  phone: string
  password?: string
}

export type TClientEditForm = {
  name?: string
  phone?: string
  password?: string
  block?: boolean
}
