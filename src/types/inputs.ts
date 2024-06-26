import {
  FormControlProps,
  InputLabelProps,
  InputProps,
  OutlinedInputProps,
  TextFieldProps,
} from '@mui/material'
import { ReactNode } from 'react'

export interface IInput {
  label?: string
  /**
   * Bu label va placeholder o'rniga o'tishi mumkin ya'ni ula yozilmasa auto o'tib ketadi
   */
  name: string
  placeholder?: string
  end?: string | ReactNode
  isLoading?: boolean
  endPosition?: string
  /**
   * Agar true berilmasa input oxiridan chiqadi
   */
  start?: boolean
  rows?: number
}

export interface IPasswordInput {
  isLoading?: boolean
  name: string
  label?: string
}

export type TPasswordInputType = IInput &
  IPasswordInput &
  FormControlProps &
  InputLabelProps &
  InputProps &
  OutlinedInputProps

export type TInputType = IInput & TextFieldProps
