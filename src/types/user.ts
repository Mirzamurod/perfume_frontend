export type UserDataType = {
  id: number | string
  role: string
  phone_number: string
}

export interface IUserStore {
  isLoading: boolean
  user: UserDataType | null
  error: any | null
  mode: 'dark' | 'light'
  token: boolean
  success: boolean
}

export interface IRegister {
  isLoading: boolean
  success: boolean
  error: any
}
