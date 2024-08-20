import { createSlice } from '@reduxjs/toolkit'
import {
  perfume,
  getpurchasedproduct,
  getpurchasedproducts,
  getproductgroups,
  getpurchasedproductorder,
} from '@/store/apis'
import { TPurchasedProductForm, TPurchasedProductState } from '@/types/purchasedProduct'

const initialState: TPurchasedProductState = {
  isLoading: false,
  searchIsLoading: false,
  purchased_products: [],
  searchPurchasedProducts: [],
  purchased_product: null,
  pageCount: 0,
  errors: null,
  success: false,
}

const purchased_product = createSlice({
  name: 'purchased_product',
  initialState,
  reducers: {
    // get products
    onStartGetPurchasedProducts: state => {
      state.isLoading = true
      state.success = false
      state.purchased_product = null
      state.errors = null
    },
    onSuccessGetPurchasedProducts: (state, { payload }) => {
      state.purchased_products = payload.data
      state.pageCount = payload.pageLists
      state.isLoading = false
    },
    onFailGetPurchasedProducts: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get products
    onStartGetSearchPurchasedProducts: state => {
      state.searchIsLoading = true
      state.success = false
    },
    onSuccessGetSearchPurchasedProducts: (state, { payload }) => {
      state.searchIsLoading = false
      state.searchPurchasedProducts = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetSearchPurchasedProducts: (state, { payload }) => {
      state.searchIsLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get purchased_product
    onStartGetPurchasedProduct: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetPurchasedProduct: (state, { payload }) => {
      state.isLoading = false
      state.purchased_product = payload.data
    },
    onFailGetPurchasedProduct: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    // get products
    onStartAddEditPurchasedProduct: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditPurchasedProduct: state => {
      state.isLoading = false
      state.success = true
    },
    onFailAddEditPurchasedProduct: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
  },
})

export const getPurchasedProducts = (params?: any) =>
  perfume({
    url: getpurchasedproducts,
    method: 'get',
    params,
    onStart: purchased_product.actions.onStartGetPurchasedProducts.type,
    onSuccess: purchased_product.actions.onSuccessGetPurchasedProducts.type,
    onFail: purchased_product.actions.onFailGetPurchasedProducts.type,
  })

export const getPurchasedProductsGroup = (params?: any) =>
  perfume({
    url: getproductgroups,
    method: 'get',
    params,
    onStart: purchased_product.actions.onStartGetPurchasedProducts.type,
    onSuccess: purchased_product.actions.onSuccessGetPurchasedProducts.type,
    onFail: purchased_product.actions.onFailGetPurchasedProducts.type,
  })

export const getSearchPurchasedProducts = (params?: any) =>
  perfume({
    url: getpurchasedproducts,
    method: 'get',
    params,
    onStart: purchased_product.actions.onStartGetSearchPurchasedProducts.type,
    onSuccess: purchased_product.actions.onSuccessGetSearchPurchasedProducts.type,
    onFail: purchased_product.actions.onFailGetSearchPurchasedProducts.type,
  })

export const getPurchasedProduct = (id: string) =>
  perfume({
    url: getpurchasedproduct + id,
    method: 'get',
    onStart: purchased_product.actions.onStartGetPurchasedProduct.type,
    onSuccess: purchased_product.actions.onSuccessGetPurchasedProduct.type,
    onFail: purchased_product.actions.onFailGetPurchasedProduct.type,
  })

export const getPurchasedProductOrder = (params: { user: string; product: string }) =>
  perfume({
    url: getpurchasedproductorder + params.user,
    method: 'get',
    params: { product: params.product },
    onStart: purchased_product.actions.onStartGetPurchasedProduct.type,
    onSuccess: purchased_product.actions.onSuccessGetPurchasedProduct.type,
    onFail: purchased_product.actions.onFailGetPurchasedProduct.type,
  })

export const addPurchasedProduct = (data: TPurchasedProductForm) =>
  perfume({
    url: getpurchasedproducts,
    method: 'post',
    data,
    onStart: purchased_product.actions.onStartAddEditPurchasedProduct.type,
    onSuccess: purchased_product.actions.onSuccessAddEditPurchasedProduct.type,
    onFail: purchased_product.actions.onFailAddEditPurchasedProduct.type,
  })

export const editPurchasedProduct = (id: string, data: TPurchasedProductForm) =>
  perfume({
    url: getpurchasedproduct + id,
    method: 'put',
    data,
    onStart: purchased_product.actions.onStartAddEditPurchasedProduct.type,
    onSuccess: purchased_product.actions.onSuccessAddEditPurchasedProduct.type,
    onFail: purchased_product.actions.onFailAddEditPurchasedProduct.type,
  })

export const deletePurchasedProduct = (id: string) =>
  perfume({
    url: getpurchasedproduct + id,
    method: 'delete',
    onStart: purchased_product.actions.onStartAddEditPurchasedProduct.type,
    onSuccess: purchased_product.actions.onSuccessAddEditPurchasedProduct.type,
    onFail: purchased_product.actions.onFailAddEditPurchasedProduct.type,
  })

export default purchased_product.reducer
