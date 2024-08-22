import { createAction } from '@reduxjs/toolkit'
import { TPerfume } from '@/types/middleware'

export const perfume = createAction<TPerfume>('perfume')

// users
export const registeruser = 'users'
export const loginUser = 'users/login'
export const userprofile = 'users'
export const userupdate = 'users/update'
export const userdelete = 'users/delete'
export const getUsersApi = 'users'

// products
export const getproducts = 'product'
export const getproduct = 'product/'

// purchased products
export const getpurchasedproducts = 'purchased-product'
export const getpurchasedproduct = 'purchased-product/'
export const getpurchasedproductorder = 'product-group/order/'
export const getproductgroups = 'product-group'

// order
export const getorders = 'order'
export const getorder = 'order/'
export const addorderlink = 'order/link/'

// supplier
export const getsuppliers = 'supplier'
export const getsupplier = 'supplier/'

// client
export const getclients = 'client'
export const getclient = 'client/'

// setting
export const getsetting = 'setting'
