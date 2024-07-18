import { TError } from './error'
import { TProduct } from './product'

export type TPurchasedProductState = {
  isLoading: boolean
  searchIsLoading: boolean
  purchased_products: TPurchasedProduct[]
  searchPurchasedProducts: TPurchasedProduct[]
  purchased_product: TPurchasedProduct | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TPurchasedProduct = {
  _id: string
  product: TProduct
} & TPurchasedProductForm

export type TPurchasedProductForm = {
  product_id: string
  count: number
  purchased_price: number
  sale_price: number
}
