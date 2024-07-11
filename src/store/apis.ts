import { createAction } from '@reduxjs/toolkit'
import { TPerfume } from '@/types/middleware'

export const perfume = createAction<TPerfume>('perfume')

// users
export const register = 'users'
export const loginUser = 'users/login'
export const userprofile = 'users'
export const userupdate = 'users/update'
export const userdelete = 'users/delete'
export const getUsersApi = 'users/get/all'

// products
export const getproducts = 'perfume'
export const getproduct = 'perfume/'

// order
export const getorders = 'order'
export const getorder = 'order/'