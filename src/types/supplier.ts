import { TError } from './error'

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
  role: 'admin' | 'client' | 'supplier'
}

export type TSupplierForm = {
  name: string
  phone: string
  password: string
}
