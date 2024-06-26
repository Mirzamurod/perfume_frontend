export type TCategoryState = {
  isLoading: boolean
  categories: TCategory[] | []
  category: TCategory | null
  success: boolean
  count: number
}

export type TCategory = {
  id: number
  name_uz: string
  name_ru: string
}
