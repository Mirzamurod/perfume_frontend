export type TBannerState = {
  isLoading: boolean
  banners: TBanner[] | []
  banner: TBanner | null
  success: boolean
  count: number
}

export type TBanner = {
  id: number
  name: string
  is_popular: boolean
  link: string
  image: string
}
