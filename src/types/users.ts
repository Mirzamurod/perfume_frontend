export type TUsersState = {
  isLoading: boolean
  users: TUser[] | []
  success: boolean
  pageCount: number
}

export type TUser = { _id: string; phone: string; role: string; name?: string, block: boolean }
