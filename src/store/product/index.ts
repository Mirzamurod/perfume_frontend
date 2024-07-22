import { createSlice } from '@reduxjs/toolkit'
import { perfume, getproducts, getproduct } from '@/store/apis'
import { TProductForm, TProductState } from '@/types/product'

const initialState: TProductState = {
  isLoading: false,
  searchIsLoading: false,
  products: [],
  searchProducts: [],
  product: null,
  pageCount: 0,
  errors: null,
  success: false,
}

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // get products
    onStartGetProducts: state => {
      state.isLoading = true
      state.success = false
      state.product = null
    },
    onSuccessGetProducts: (state, { payload }) => {
      state.products = payload.data
      state.pageCount = payload.pageLists
      state.isLoading = false
    },
    onFailGetProducts: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get products
    onStartGetSearchProducts: state => {
      state.searchIsLoading = true
      state.success = false
    },
    onSuccessGetSearchProducts: (state, { payload }) => {
      state.searchIsLoading = false
      state.searchProducts = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetSearchProducts: (state, { payload }) => {
      state.searchIsLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get product
    onStartGetProduct: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetProduct: (state, { payload }) => {
      state.isLoading = false
      state.product = payload.data
    },
    onFailGetProduct: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get products
    onStartAddProduct: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddProduct: state => {
      state.isLoading = false
      state.success = true
    },
    onFailAddProduct: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
  },
})

export const getProducts = (params?: any) =>
  perfume({
    url: getproducts,
    method: 'get',
    params,
    onStart: product.actions.onStartGetProducts.type,
    onSuccess: product.actions.onSuccessGetProducts.type,
    onFail: product.actions.onFailGetProducts.type,
  })

export const getSearchProducts = (params?: any) =>
  perfume({
    url: getproducts,
    method: 'get',
    params,
    onStart: product.actions.onStartGetSearchProducts.type,
    onSuccess: product.actions.onSuccessGetSearchProducts.type,
    onFail: product.actions.onFailGetSearchProducts.type,
  })

export const getProduct = (id: string) =>
  perfume({
    url: getproduct + id,
    method: 'get',
    onStart: product.actions.onStartGetProduct.type,
    onSuccess: product.actions.onSuccessGetProduct.type,
    onFail: product.actions.onFailGetProduct.type,
  })

export const addProduct = (data: TProductForm) =>
  perfume({
    url: getproducts,
    method: 'post',
    data,
    onStart: product.actions.onStartAddProduct.type,
    onSuccess: product.actions.onSuccessAddProduct.type,
    onFail: product.actions.onFailAddProduct.type,
  })

export const editProduct = (id: string, data: TProductForm) =>
  perfume({
    url: getproduct + id,
    method: 'put',
    data,
    onStart: product.actions.onStartAddProduct.type,
    onSuccess: product.actions.onSuccessAddProduct.type,
    onFail: product.actions.onFailAddProduct.type,
  })

export const deleteProduct = (id: string) =>
  perfume({
    url: getproduct + id,
    method: 'delete',
    onStart: product.actions.onStartAddProduct.type,
    onSuccess: product.actions.onSuccessAddProduct.type,
    onFail: product.actions.onFailAddProduct.type,
  })

export default product.reducer
