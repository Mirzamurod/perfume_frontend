export type TBrandState = {
  isLoading: boolean
  brands: TBrand[] | []
  brand: TBrand | null
  success: boolean
  count: number
}

export type TBrand = {
  id: number
  name: string
  is_popular: boolean
  link: string
  brand_image: string
}
