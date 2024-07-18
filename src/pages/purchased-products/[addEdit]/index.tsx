import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { getProducts } from '@/store/product'
import { useAppSelector } from '@/store'
import AddEditCard from '@/view/purchase-product/AddEditCard'
import AddEditAction from '@/view/purchase-product/AddEditAction'
import { TPurchasedProductForm } from '@/types/purchasedProduct'
import {
  addPurchasedProduct,
  editPurchasedProduct,
  getPurchasedProduct,
} from '@/store/purchased_product'

const AddEditProduct = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const formSchema = yup.object().shape({
    product_id: yup.string().required(t('product_required')),
    count: yup.number().required(t('count_required')).min(1, t('min_1')),
    purchased_price: yup.number().required(t('purchased_price_required')).min(1, t('min_1')),
    sale_price: yup.number().required(t('sale_price_required')).min(1, t('min_1')),
  })
  const methods = useForm<TPurchasedProductForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: {
      count: 0,
      product_id: '',
      purchased_price: 0,
      sale_price: 0,
    },
  })
  const { handleSubmit, setValue, setError, reset } = methods

  const {
    isLoading,
    success,
    errors: purchasedProductErrors,
    purchased_product,
  } = useAppSelector(state => state.purchased_product)

  const onSubmit = (values: TPurchasedProductForm) => {
    if (router.query.addEdit === 'add') dispatch(addPurchasedProduct(values))
    else dispatch(editPurchasedProduct(router.query.addEdit as string, values))
  }

  useEffect(() => {
    if (router.query.addEdit && router.query.addEdit !== 'add')
      dispatch(getPurchasedProduct(router.query.addEdit as string))
    else reset()
  }, [router.query.addEdit])

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if (purchased_product)
      Object.keys(purchased_product).map(key => {
        if (key === 'product') setValue('product_id', purchased_product.product._id)
        else
          setValue(
            key as keyof TPurchasedProductForm,
            purchased_product[key as keyof TPurchasedProductForm]
          )
      })
  }, [purchased_product])

  useEffect(() => {
    if (success) {
      reset()
      router.push({ pathname: '/purchased-products/list', query: { page: 1, limit: 10 } })
    }
  }, [success])

  useEffect(() => {
    if (purchasedProductErrors?.length)
      purchasedProductErrors.map(item =>
        setError(item.path as keyof TPurchasedProductForm, { type: 'custom', message: item.msg })
      )
  }, [purchasedProductErrors])

  return (
    <FormProvider {...methods}>
      <Box>
        <Flex justifyContent='space-between'>
          <Heading mb={4}>
            {t(router.query.addEdit === 'add' ? 'add_purchased_product' : 'edit_purchased_product')}
          </Heading>
          <Button as={Link} href='/purchased-products/list?page=1&limit=10'>
            {t('go_to_purchased_products')}
          </Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddEditCard />
          <AddEditAction />
        </form>
      </Box>
    </FormProvider>
  )
}

export default AddEditProduct
