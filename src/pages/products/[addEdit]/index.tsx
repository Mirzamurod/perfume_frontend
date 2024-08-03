import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { GenderTypes, SeasonTypes, TProductForm, TypeTypes } from '@/types/product'
import { addProduct, editProduct, getProduct } from '@/store/product'
import { useAppSelector } from '@/store'
import AddEditCard from '@/view/product/AddEditCard'
import AddEditAction from '@/view/product/AddEditAction'

const AddEditProduct = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const formSchema = yup.object().shape({
    type: yup
      .mixed<TypeTypes>()
      .oneOf(['perfume', 'muskambar'], 'no_type')
      .required(t('type_required')),
    season: yup
      .mixed<SeasonTypes>()
      .oneOf(['winter', 'spring', 'summer', 'autumn'], 'no_season')
      .required(t('season_required')),
    gender: yup
      .mixed<GenderTypes>()
      .oneOf(['boy', 'girl'], 'no_gender')
      .required(t('gender_required')),
    name: yup.string().required(t('name_required')),
    color: yup.string().required(t('color_required')),
    smell: yup.string().required(t('smell_required')),
    persistence_of_the_smell: yup.number().required(t('persistence_required')).min(1, 'min_1'),
  })
  const methods = useForm<TProductForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: {
      type: 'perfume',
      season: 'winter',
      gender: 'boy',
      name: '',
      color: '',
      smell: '',
      persistence_of_the_smell: 1,
    },
  })
  const { handleSubmit, setValue, setError, reset } = methods

  const {
    success,
    errors: productErrors,
    product,
  } = useAppSelector(state => state.product)

  const onSubmit = (values: TProductForm) => {
    if (router.query.addEdit === 'add') dispatch(addProduct(values))
    else dispatch(editProduct(router.query.addEdit as string, values))
  }

  useEffect(() => {
    if (router.query.addEdit && router.query.addEdit !== 'add')
      dispatch(getProduct(router.query.addEdit as string))
    else reset()
  }, [router.query.addEdit, reset])

  useEffect(() => {
    if (product)
      Object.keys(product).map(key =>
        setValue(key as keyof TProductForm, product[key as keyof TProductForm])
      )
  }, [product])

  useEffect(() => {
    if (success) {
      reset()
      router.push({ pathname: '/products/list', query: { page: 1, limit: 10 } })
    }
  }, [success])

  useEffect(() => {
    if (productErrors?.length)
      productErrors.map(item =>
        setError(item.path as keyof TProductForm, { type: 'custom', message: item.msg })
      )
  }, [productErrors])

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack mb={4} justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }}>
          <Heading>{t(router.query.addEdit === 'add' ? 'add_product' : 'edit_product')}</Heading>
          <Button as={Link} href='/products/list?page=1&limit=10'>
            {t('go_to_products')}
          </Button>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddEditCard />
          <AddEditAction />
        </form>
      </Box>
    </FormProvider>
  )
}

export default AddEditProduct
