export type TPerfume = {
  /**
   * link
   */
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'head' | 'patch'
  data?: any
  params?: any
  onStart: string
  onSuccess: string
  onFail: string
}
