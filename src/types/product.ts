import { TError } from './error'

export type TProductState = {
  isLoading: boolean
  products: TProduct[]
  product: TProduct | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TypeTypes = 'perfume' | 'muskambar'
export type SeasonTypes = 'winter' | 'spring' | 'summer' | 'autumn'
export type GenderTypes = 'boy' | 'girl'

export type TProduct = {
  _id: string
  slug: string
} & TProductForm

export type TProductForm = {
  type: TypeTypes
  season: SeasonTypes
  gender: GenderTypes
  name: string
  color: string
  smell: string
  persistence_of_the_smell: number
  purchase_price: number
  sale_price: number
}
