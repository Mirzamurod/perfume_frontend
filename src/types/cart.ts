import { TProduct } from './product'

export type TCartState = {
  isLoading: boolean
  cart: TProduct[] | []
  success: boolean
}
