import { TError } from "./error"

export type UserDataType = {
  id: number | string
  role: string
  phone: string
}

export interface IUserStore {
  isLoading: boolean
  user: UserDataType | null
  errors: TError[] | null
  token: boolean
  success: boolean
}

export interface IRegister {
  isLoading: boolean
  success: boolean
  error: any
}
