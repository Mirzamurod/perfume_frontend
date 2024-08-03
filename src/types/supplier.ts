import { TError } from './error'
import { TUserRole } from './user'

export type TSupplierState = {
  isLoading: boolean
  suppliers: TSupplier[]
  supplier: TSupplier | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TSupplier = {
  _id: string
  name?: string
  phone: string
  orders: number
  finished_orders: number
  role: TUserRole
  block: boolean
}

export type TSupplierForm = {
  name?: string
  phone: string
  password?: string
}

export type TSupplierEditForm = {
  name?: string
  phone?: string
  password?: string
  block?: boolean
}
