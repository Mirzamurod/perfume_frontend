import { TError } from './error'
import { TProduct } from './product'
import { UserDataType } from './user'

export type TOrderState = {
  isLoading: boolean
  orders: TOrder[]
  order: TOrder | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TOrder = {
  _id: string
  name: string
  phone: string
  location?: number[]
  delivery_date?: Date
  supplier?: UserDataType
  status: 'added' | 'on_the_way' | 'accepted' | 'sold' | 'cancelled'
  perfumes: { perfume: TProduct; qty: number }[]
}

export type TOrderForm = {
  name: string
  phone: string
  payment_method: TPaymentMethod
  location?: number[]
  delivery_date?: string
  supplierId?: string
  perfumes: { qty: number; id: string }[]
}

export type TPaymentMethod = 'cash' | 'card'
