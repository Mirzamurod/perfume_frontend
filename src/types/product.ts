import { TError } from './error'

export type TProductState = {
  isLoading: boolean
  products: any
  product: any | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TypeTypes = 'atir' | 'mushkambar'
export type SeasonTypes = 'winter' | 'spring' | 'summer' | 'autumn'
export type GenderTypes = 'boy' | 'girl'

export type TProduct = {
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
