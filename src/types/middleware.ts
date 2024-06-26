export type TEltop = {
  /**
   * link
   */
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'head'
  data?: any
  params?: any
  onStart: string
  onSuccess: string
  onFail: string
}
