import { createSlice } from '@reduxjs/toolkit'
import { perfume, getproducts, addproduct } from '@/store/apis'
import { TProduct, TProductState } from '@/types/product'

const initialState: TProductState = {
  isLoading: false,
  products: [],
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

export const addProduct = (data: TProduct) =>
  perfume({
    url: addproduct,
    method: 'post',
    data,
    onStart: product.actions.onStartAddProduct.type,
    onSuccess: product.actions.onSuccessAddProduct.type,
    onFail: product.actions.onFailAddProduct.type,
  })

export default product.reducer
