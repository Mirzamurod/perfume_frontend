import axios from 'axios'
import { TPerfume } from '@/types/middleware'
import { decode } from 'js-base64'
import { useToast } from '@chakra-ui/react'
import { useLanguage } from '@/context/LanguageContext'

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  (action: { type: string; payload: TPerfume }) => {
    // const toast = useToast()
    // const { language } = useLanguage()

    if (action.type !== 'perfume') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const token = localStorage.getItem('perfume')

    const headers = token ? { Authorization: `Bearer ${decode(token)}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      baseURL: 'http://localhost:5000/api/',
      method,
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
        const data = error?.response?.data
        if (data?.message)
        // if (error?.response?.status === 400) {
        //   if (typeof data?.message === 'string') toast({ status: 'warning', title: data?.message })
        //   else toast({ status: 'warning', title: data?.message?.[language.lang] })
        // } else toast({ status: 'warning', title: data?.message })
        dispatch({ type: onFail, payload: error?.response?.data })
      })
  }

export default middleware
