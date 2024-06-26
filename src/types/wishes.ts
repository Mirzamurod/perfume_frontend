import { TProduct } from './product'

export type TWishesState = {
  isLoading: boolean
  wishes: TProduct[] | []
  success: boolean
}
