import { TError } from './error'

export type TProductState = {
  isLoading: boolean
  searchIsLoading: boolean
  products: TProduct[]
  searchProducts: TProduct[]
  product: TProduct | null
  success: boolean
  errors: null | TError[]
  pageCount: number
}

export type TypeTypes = 'perfume' | 'muskambar'
export type SeasonTypes = 'winter' | 'spring' | 'summer' | 'autumn' | 'all_seasonal'
export type GenderTypes = 'male' | 'female' | 'unisex'

export type TProduct = {
  _id: string
  slug: string
} & TProductForm

export type TProductForm = {
  type: TypeTypes
  season: SeasonTypes
  gender: GenderTypes
  name: string
  color?: string
  smell: string
  persistence_of_the_smell: number
}
