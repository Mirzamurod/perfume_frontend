import { createAction } from '@reduxjs/toolkit'
import { TEltop } from '@/types/middleware'

export const elTop = createAction<TEltop>('elTop')

// users
export const registerUser = 'user/create'
export const loginUser = 'user/login'
export const userprofile = 'user/return/user'
export const userupdate = 'user/update'
export const userdelete = 'user/delete'
export const getUsersApi = 'user/get/all'

// products
export const getproducts = 'product/get/all'
export const getproduct = 'product/get/'
export const addproduct = 'product/create'
export const editproduct = 'product/udpate'
export const deleteproduct = 'product/delete'

// categories
export const categories = 'category/get/all'
export const getcategory = 'category/get'
export const addcategory = 'category/create'
export const editcategory = 'category/update'
export const deletecategory = 'category/delete'

// subcategory
export const subcategories = 'subcategory/get/all'
export const getsubcategory = 'subcategory/get'
export const addsubcategory = 'subcategory/create'
export const editsubcategory = 'subcategory/udpate'
export const deletesubcategory = 'subcategory/delete'

// order pending
export const orderpendings = 'order/get/all/pending'
export const getorder = 'order/get/for/admin'
export const editorderstatus = 'order/update'

// order accepteds
export const orderaccepteds = 'order/get/all/process'

// order cancelleds
export const ordercancelleds = 'order/get/all/cancel'

// order solds
export const ordersolds = 'order/get/all/accept'

// brand
export const getbrands = 'brands/get/all'
export const getbrand = 'brands/get'
export const addbrand = 'brands/create'
export const editbrand = 'brands/udpate'
export const deletebrand = 'brands/delete'

// banner
export const getbanners = 'banner/get/all'
export const getbanner = 'banner/get'
export const addbanner = 'banner/create'
export const editbanner = 'banner/udpate'
export const deletebanner = 'banner/delete'

// cart
export const getcart = 'cart/get/carts'
export const deletecart = 'cart/delete'
export const addcart = 'cart'

// wishes
export const getwishes = 'favourite/get/favourite'
export const deletewish = 'favourite/delete'
export const addwish = 'favourite/create'
