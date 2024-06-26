import { createSlice } from '@reduxjs/toolkit'
import { elTop, getUsersApi } from '@/store/apis'
import { TUsersState } from '@/types/users'

const initialState: TUsersState = {
  isLoading: false,
  users: [],
  success: false,
  count: 0,
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // get users
    onStartGetUsers: state => {
      state.isLoading = true
      state.success = false
      state.users = []
    },
    onSuccessGetUsers: (state, { payload }) => {
      state.isLoading = false
      state.users = payload.items
      state.count = payload.total_items
    },
    onFailGetUsers: (state, { payload }) => {
      state.isLoading = false
    },
  },
})

export const getUsers = (params?: any) =>
  elTop({
    url: getUsersApi,
    method: 'get',
    params,
    onStart: users.actions.onStartGetUsers.type,
    onSuccess: users.actions.onSuccessGetUsers.type,
    onFail: users.actions.onFailGetUsers.type,
  })

export default users.reducer
