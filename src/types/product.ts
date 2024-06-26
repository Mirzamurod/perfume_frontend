export type TProductState = {
  isLoading: boolean
  searchLoading: boolean
  products: TProduct[] | []
  search: TProduct[] | []
  product: TProduct | null
  success: boolean
  count: number
}

export type TProduct = {
  brand_name: string
  category: string
  count: number | string
  created_at?: Date
  description_ru?: string
  description_uz?: string
  discount_price?: number | string
  id?: number
  info_count?: null | number
  is_active?: boolean
  is_delivery_free?: boolean
  max_count: number | string
  name_uz: string
  name_ru: string
  photo_1?: null | string
  photo_2?: null | string
  photo_3?: null | string
  photo_4?: null | string
  photo_5?: null | string
  photo_6?: null | string
  price: number | string
  price_type: string
  quantity?: number
  sub_category: string
  tag?: null | string
  unit: string | string
  updated_at?: Date
  weight?: string
}
