import axios from 'axios'
import { toast } from 'react-toastify'
import { TEltop } from '@/types/middleware'
import { decode } from 'js-base64'

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  (action: { type: string; payload: TEltop }) => {
    if (action.type !== 'elTop') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const token = localStorage.getItem('elTop')
    const lang = JSON.parse(localStorage.getItem('lang')!)

    const headers = token ? { Authorization: `Bearer ${decode(token)}` } : null
    // const headers = token ? { Authorization: `Bearer ${token}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      baseURL: process.env.BACKEND_URL,
      method,
      // data: { ...data, token: 'string' },
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201)
          dispatch({ type: onSuccess, payload: res.data })
        else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        if (error?.response?.status === 400) {
          const data = error?.response?.data
          if (typeof data?.message === 'string') toast.warn(data?.message)
          else toast.warn(data?.message?.[lang.lang])
        } else toast.error('Something went wrong')

        dispatch({ type: onFail, payload: error })
      })
  }

export default middleware
