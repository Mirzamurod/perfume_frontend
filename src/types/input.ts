import { InputProps } from '@chakra-ui/react'

export type TInput = {
  name: string
  label?: string
  // placeholder?: string
}

export type TInputType = TInput & InputProps
