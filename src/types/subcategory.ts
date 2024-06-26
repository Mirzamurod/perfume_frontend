export type TSubCategoryState = {
  isLoading: boolean
  subcategories: TSubCategory[] | []
  subcategory: TSubCategory | null
  success: boolean
  count: number
}

export type TSubCategory = {
  id: number
  category_id: number
  name_uz: string
  name_ru: string
  href: string
}
