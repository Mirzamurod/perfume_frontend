import { TProduct } from "./product"

// Pending
export type TOrderPendingState = {
  isLoading: boolean
  orderPendings: TOrderPending[] | []
  orderPending: TOrderPending | null
  success: boolean
  count: number
}

export type TOrderPending = {
  id?: number
  city: string
  region: string
  street: string
  home_number: string
  comment_for_courier: string
  delivery_time: string
  payment_type: string
  first_name: string
  last_name: string
  extra_phone_number: string
  status?: string
  products: TProduct[]
}
// products: [{id: 6, name_uz: "generator", name_ru: "generator", description_uz: "generator",…},…]

// Accepted
export type TOrderAcceptedState = {
  isLoading: boolean
  orderAccepteds: TOrderPending[] | []
  orderAccepted: TOrderPending | null
  success: boolean
  count: number
}

// Cancelled
export type TOrderCancelledState = {
  isLoading: boolean
  orderCancelleds: TOrderPending[] | []
  orderCancelled: TOrderPending | null
  success: boolean
  count: number
}

// Sold
export type TOrderSoldState = {
  isLoading: boolean
  orderSolds: TOrderPending[] | []
  orderSold: TOrderPending | null
  success: boolean
  count: number
}
