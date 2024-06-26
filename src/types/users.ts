export type TUsersState = {
  isLoading: boolean
  users: TUser[] | []
  success: boolean
  count: number
}

export type TUser = { id: number; phone_number: string; role: string }
