import { TError } from './error'

export type TSettingState = {
  isLoading: boolean
  setting: TSetting | null
  success: boolean
  errors: null | TError[]
}

export type TSetting = {
  botId?: string
  groupId?: string
}