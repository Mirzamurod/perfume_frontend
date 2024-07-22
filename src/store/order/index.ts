import { createSlice } from '@reduxjs/toolkit'
import { perfume, getorders, getorder } from '@/store/apis'
import { TOrderForm, TOrderState } from '@/types/order'

const initialState: TOrderState = {
  isLoading: false,
  orders: [],
  order: null,
  pageCount: 0,
  errors: null,
  success: false,
}

const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // get orders
    onStartGetOrders: state => {
      state.isLoading = true
      state.success = false
      state.errors = null
      state.order = null
    },
    onSuccessGetOrders: (state, { payload }) => {
      state.orders = payload.data
      state.pageCount = payload.pageLists
      state.isLoading = false
    },
    onFailGetOrders: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get order
    onStartGetOrder: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetOrder: (state, { payload }) => {
      state.isLoading = false
      state.order = payload.data
    },
    onFailGetOrder: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get order
    onStartAddOrder: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddOrder: state => {
      state.isLoading = false
      state.success = true
    },
    onFailAddOrder: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
  },
})

export const getOrders = (params?: any) =>
  perfume({
    url: getorders,
    method: 'get',
    params,
    onStart: order.actions.onStartGetOrders.type,
    onSuccess: order.actions.onSuccessGetOrders.type,
    onFail: order.actions.onFailGetOrders.type,
  })

export const getOrder = (id: string) =>
  perfume({
    url: getorder + id,
    method: 'get',
    onStart: order.actions.onStartGetOrder.type,
    onSuccess: order.actions.onSuccessGetOrder.type,
    onFail: order.actions.onFailGetOrder.type,
  })

export const addOrder = (data: TOrderForm) =>
  perfume({
    url: getorders,
    method: 'post',
    data,
    onStart: order.actions.onStartAddOrder.type,
    onSuccess: order.actions.onSuccessAddOrder.type,
    onFail: order.actions.onFailAddOrder.type,
  })

export const editOrder = (id: string, data: TOrderForm) =>
  perfume({
    url: getorder + id,
    method: 'patch',
    data,
    onStart: order.actions.onStartAddOrder.type,
    onSuccess: order.actions.onSuccessAddOrder.type,
    onFail: order.actions.onFailAddOrder.type,
  })

export const deleteOrder = (id: string) =>
  perfume({
    url: getorder + id,
    method: 'delete',
    onStart: order.actions.onStartAddOrder.type,
    onSuccess: order.actions.onSuccessAddOrder.type,
    onFail: order.actions.onFailAddOrder.type,
  })

export default order.reducer
