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
  name: string
  phone: string
  perfumes: { perfume: TProduct; qty: number }[]
}

export type TOrderForm = {
  name: string
  phone: string
  perfumes: { qty: number; id: string }[]
}
