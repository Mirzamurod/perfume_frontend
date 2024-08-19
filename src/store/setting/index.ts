import { createSlice } from '@reduxjs/toolkit'
import { getsetting, perfume } from '@/store/apis'
import { TSetting, TSettingState } from '@/types/setting'

const initialState: TSettingState = {
  isLoading: false,
  setting: null,
  errors: null,
  success: false,
}

const setting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // get setting
    onStartGetSetting: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetSetting: (state, { payload }) => {
      state.isLoading = false
      state.setting = payload.data
    },
    onFailGetSetting: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get add edit setting
    onStartAddEditSetting: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditSetting: state => {
      state.isLoading = false
      state.success = true
    },
    onFailAddEditSetting: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
  },
})

export const getSetting = () =>
  perfume({
    url: getsetting,
    method: 'get',
    onStart: setting.actions.onStartGetSetting.type,
    onSuccess: setting.actions.onSuccessGetSetting.type,
    onFail: setting.actions.onFailGetSetting.type,
  })

export const addSetting = (data: TSetting) =>
  perfume({
    url: getsetting,
    method: 'post',
    data,
    onStart: setting.actions.onStartAddEditSetting.type,
    onSuccess: setting.actions.onSuccessAddEditSetting.type,
    onFail: setting.actions.onFailAddEditSetting.type,
  })

export const editSetting = (data: TSetting) =>
  perfume({
    url: getsetting,
    method: 'patch',
    data,
    onStart: setting.actions.onStartAddEditSetting.type,
    onSuccess: setting.actions.onSuccessAddEditSetting.type,
    onFail: setting.actions.onFailAddEditSetting.type,
  })

export default setting.reducer
