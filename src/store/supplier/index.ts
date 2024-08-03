import { createSlice } from '@reduxjs/toolkit'
import { perfume, getsupplier, getsuppliers } from '@/store/apis'
import { TSupplierEditForm, TSupplierForm, TSupplierState } from '@/types/supplier'

const initialState: TSupplierState = {
  isLoading: false,
  suppliers: [],
  supplier: null,
  pageCount: 0,
  errors: null,
  success: false,
}

const supplier = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    // get suppliers
    onStartGetSuppliers: state => {
      state.isLoading = true
      state.success = false
      state.errors = null
      state.supplier = null
    },
    onSuccessGetSuppliers: (state, { payload }) => {
      state.suppliers = payload.data
      state.pageCount = payload.pageLists
      state.isLoading = false
    },
    onFailGetSuppliers: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get supplier
    onStartGetSupplier: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetSupplier: (state, { payload }) => {
      state.isLoading = false
      state.supplier = payload.data
    },
    onFailGetSupplier: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get supplier
    onStartAddSupplier: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddSupplier: state => {
      state.isLoading = false
      state.success = true
    },
    onFailAddSupplier: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
  },
})

export const getSuppliers = (params?: any) =>
  perfume({
    url: getsuppliers,
    method: 'get',
    params,
    onStart: supplier.actions.onStartGetSuppliers.type,
    onSuccess: supplier.actions.onSuccessGetSuppliers.type,
    onFail: supplier.actions.onFailGetSuppliers.type,
  })

export const getSupplier = (id: string) =>
  perfume({
    url: getsupplier + id,
    method: 'get',
    onStart: supplier.actions.onStartGetSupplier.type,
    onSuccess: supplier.actions.onSuccessGetSupplier.type,
    onFail: supplier.actions.onFailGetSupplier.type,
  })

export const addSupplier = (data: TSupplierForm) =>
  perfume({
    url: getsuppliers,
    method: 'post',
    data,
    onStart: supplier.actions.onStartAddSupplier.type,
    onSuccess: supplier.actions.onSuccessAddSupplier.type,
    onFail: supplier.actions.onFailAddSupplier.type,
  })

export const editSupplier = (id: string, data: TSupplierEditForm) =>
  perfume({
    url: getsupplier + id,
    method: 'patch',
    data,
    onStart: supplier.actions.onStartAddSupplier.type,
    onSuccess: supplier.actions.onSuccessAddSupplier.type,
    onFail: supplier.actions.onFailAddSupplier.type,
  })

export const deleteSupplier = (id: string) =>
  perfume({
    url: getsupplier + id,
    method: 'delete',
    onStart: supplier.actions.onStartAddSupplier.type,
    onSuccess: supplier.actions.onSuccessAddSupplier.type,
    onFail: supplier.actions.onFailAddSupplier.type,
  })

export default supplier.reducer
