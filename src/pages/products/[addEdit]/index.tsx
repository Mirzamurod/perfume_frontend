import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Select,
} from '@chakra-ui/react'
import Input from '@/components/Input'
import { TInputType } from '@/types/input'
import { GenderTypes, SeasonTypes, TProductForm, TypeTypes } from '@/types/product'
import { addProduct, editProduct, getProduct } from '@/store/product'
import { useAppSelector } from '@/store'

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
    purchase_price: yup.number().required(t('purchase_price_required')).min(1, 'min_1'),
    sale_price: yup.number().required(t('sale_price_required')).min(1, 'min_1'),
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
      purchase_price: 0,
      sale_price: 0,
    },
  })
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = methods

  const {
    isLoading,
    success,
    errors: productErrors,
    product,
  } = useAppSelector(state => state.product)

  const inputs: TInputType[] = [
    { name: 'name', isRequired: true },
    { name: 'color', isRequired: true },
    { name: 'smell', isRequired: true },
    { name: 'persistence_of_the_smell', type: 'number', isRequired: true },
    { name: 'purchase_price', type: 'number', isRequired: true },
    { name: 'sale_price', type: 'number', isRequired: true },
  ]

  const onSubmit = (values: TProductForm) => {
    if (router.query.addEdit === 'add') dispatch(addProduct(values))
    else dispatch(editProduct(router.query.addEdit as string, values))
  }

  useEffect(() => {
    if (router.query.addEdit && router.query.addEdit !== 'add')
      dispatch(getProduct(router.query.addEdit as string))
    else reset()
  }, [router.query.addEdit])

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justifyContent='space-between'>
            <Heading mb={4}>
              {t(router.query.addEdit === 'add' ? 'add_product' : 'edit_product')}
            </Heading>
            <Button as={Link} href='/products/list'>
              {t('go_to_products')}
            </Button>
          </Flex>
          <Box>
            <Grid
              templateColumns={{
                xl: 'repeat(3, 1fr)',
                lg: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                sm: 'repeat(2, 1fr)',
                base: 'repeat(1, 1fr)',
              }}
              gap={4}
            >
              <GridItem>
                <FormControl isInvalid={!!errors.type?.message} isRequired>
                  <FormLabel>{t('type')}</FormLabel>
                  <Select {...register('type')}>
                    <option value='perfume'>{t('perfume')}</option>
                    <option value='muskambar'>{t('muskambar')}</option>
                  </Select>
                  {errors.type?.message ? (
                    <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.season?.message} isRequired>
                  <FormLabel>{t('season')}</FormLabel>
                  <Select {...register('season')}>
                    <option value='winter'>{t('winter')}</option>
                    <option value='spring'>{t('spring')}</option>
                    <option value='summer'>{t('summer')}</option>
                    <option value='autumn'>{t('autumn')}</option>
                  </Select>
                  {errors.season?.message ? (
                    <FormErrorMessage>{errors.season?.message}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.gender?.message} isRequired>
                  <FormLabel>{t('gender')}</FormLabel>
                  <Select {...register('gender')}>
                    <option value='boy'>{t('boy')}</option>
                    <option value='girl'>{t('girl')}</option>
                  </Select>
                  {errors.gender?.message ? (
                    <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </GridItem>
              {inputs.map(item => (
                <GridItem key={item.name}>
                  <Input {...item} />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Flex mt={4} justifyContent='end'>
            <Button
              variant='outline'
              colorScheme='teal'
              type='submit'
              isLoading={isLoading}
              loadingText={t(router.query.addEdit === 'add' ? 'add_product' : 'edit_product')}
            >
              {t(router.query.addEdit === 'add' ? 'add_product' : 'edit_product')}
            </Button>
          </Flex>
        </form>
      </Box>
    </FormProvider>
  )
}

export default AddEditProduct
