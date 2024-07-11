import { TError } from './error'
import { TProduct } from './product'

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
  phone: string
  name: string
  perfumes: TProduct[]
}

export type TOrderForm = {
  name: string
  phone: string
  perfumes: { qty: number; id: string }[]
}
