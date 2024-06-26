import { createSlice } from '@reduxjs/toolkit'
import { encode } from 'js-base64'
import { elTop, loginUser, userdelete, userprofile, userupdate } from '@/store/apis'
import { IUserStore } from '@/types/user'

const initialState: IUserStore = {
  isLoading: false,
  user: null,
  token: false,
  error: null,
  success: false,
  mode:
    typeof window !== 'undefined'
      ? (window.localStorage.getItem('mode') as 'light' | 'dark') ?? 'light'
      : 'light',
}

const login = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.token = false
      state.success = false
    },
    onSuccess: (state, { payload }) => {
      localStorage.setItem('elTop', encode(payload.messages))
      state.token = true
      state.isLoading = false
      state.success = true
    },
    userProfile: (state, { payload }) => {
      state.isLoading = false
      state.user = payload.data
      state.mode = payload.data.mode
    },
    userUpdate: (state, { payload }) => {
      state.isLoading = false
    },
    userDelete: (state, { payload }) => {
      state.isLoading = false
    },
    onFail: (state, { payload }) => {
      state.isLoading = false
    },
    changeMode: state => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    getUserData: (state, { payload }) => {
      state.user = payload
    },
    deleteUser: state => {
      state.user = null
      localStorage.removeItem('elTop')
    },
  },
})

export const userLogin = (data: any) =>
  elTop({
    url: loginUser,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.onSuccess.type,
    onFail: login.actions.onFail.type,
  })

export const userProfile = () =>
  elTop({
    url: userprofile,
    method: 'get',
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userProfile.type,
    onFail: login.actions.onFail.type,
  })

export const userUpdate = (data: any) =>
  elTop({
    url: userupdate,
    method: 'put',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const userDelete = (data: any) =>
  elTop({
    url: userdelete,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const { changeMode, getUserData, deleteUser } = login.actions

export default login.reducer
