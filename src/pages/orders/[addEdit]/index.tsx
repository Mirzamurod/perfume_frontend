import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useAppSelector } from '@/store'
import AddEditCard from '@/view/order/AddEditCard'
import AddEditAction from '@/view/order/AddEditAction'
import { TOrderForm, TOrderStatus, TPaymentMethod } from '@/types/order'
import { addOrder, editOrder, getOrder } from '@/store/order'
import { getPurchasedProductsGroup } from '@/store/purchased_product'
import { getSuppliers } from '@/store/supplier'

const AddEditOrder = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [count, setCount] = useState<number[]>([])
  const formSchema = yup.object().shape({
    name: yup.string().required(t('name_required')),
    phone: yup.string().required(t('phone_required')),
    payment_method: yup
      .mixed<TPaymentMethod>()
      .oneOf(['cash', 'card'], 'no_payment_method')
      .required(t('payment_method_required')),
    delivery_date: yup.string(),
    location: yup.array(),
    supplierId: yup.string(),
    status: yup
      .mixed<TOrderStatus>()
      .oneOf(['added', 'accepted', 'cancelled', 'on_the_way', 'sold'])
      .required(),
    perfumes: yup
      .array(
        yup.object().shape({
          id: yup.string().required(t('product_required')),
          qty: yup.number().required(t('quantity_required')).min(1, t('min_1')),
        })
      )
      .required(''),
  })
  const methods = useForm<TOrderForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      payment_method: 'cash',
      status: 'added',
      perfumes: [{ qty: 0, id: '' }],
    },
  })
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, errors: orderErrors, order } = useAppSelector(state => state.order)
  const { purchased_products } = useAppSelector(state => state.purchased_product)

  const onSubmit = (values: TOrderForm) => {
    if (router.query.addEdit === 'add') dispatch(addOrder(values))
    else dispatch(editOrder(router.query.addEdit as string, values))
  }

  useEffect(() => {
    dispatch(getPurchasedProductsGroup())
    dispatch(getSuppliers())
  }, [])

  useEffect(() => {
    if (router.query.addEdit && router.query.addEdit !== 'add')
      dispatch(getOrder(router.query.addEdit as string))
    else reset()
  }, [router.query.addEdit])

  useEffect(() => {
    if (order && purchased_products.length) {
      Object.keys(order).map(key => {
        setValue(key as keyof TOrderForm, order[key as 'name'])
      })
      const perfumes = order.perfumes.map(item => ({ qty: item.qty, id: item?.perfume?._id }))
      setValue('perfumes', perfumes)
      setValue('supplierId', order?.supplier?._id)
      if (order.delivery_date)
        setValue('delivery_date', order?.delivery_date?.toString().slice(0, 10))
      else setValue('delivery_date', '')

      let data = order.perfumes.map(item => item.qty)
      setCount(data)
    }
  }, [order, purchased_products])

  useEffect(() => {
    if (success) {
      reset()
      router.push({ pathname: '/orders/list', query: { page: 1, limit: 10 } })
    }
  }, [success])

  useEffect(() => {
    if (orderErrors?.length)
      orderErrors.map(item =>
        setError(item.path as keyof TOrderForm, { type: 'custom', message: item.msg })
      )
  }, [orderErrors])

  return (
    <FormProvider {...methods}>
      <Box>
        <Flex justifyContent='space-between'>
          <Heading mb={4}>{t(router.query.addEdit === 'add' ? 'add_order' : 'edit_order')}</Heading>
          <Button as={Link} href='/orders/list?limit=10&page=1'>
            {t('go_to_orders')}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddEditCard count={count} order={order!} />
          <AddEditAction />
        </form>
      </Box>
    </FormProvider>
  )
}

export default AddEditOrder
