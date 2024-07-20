import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Alert, AlertIcon, Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useAppSelector } from '@/store'
import AddEditCard from '@/view/supplier/AddEditCard'
import AddEditAction from '@/view/supplier/AddEditAction'
import { TSupplierForm } from '@/types/supplier'
import { addSupplier, editSupplier, getSupplier } from '@/store/supplier'

const AddEditSupplier = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const isAddMode = router.query.addEdit === 'add'
  const formSchema = yup.object().shape({
    name: yup.string(),
    phone: yup.string().required(t('phone_required')),
    // password: yup.string().required(t('password_required')),
    password: yup.string(),
  })
  const methods = useForm<TSupplierForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { name: '', phone: '', password: '' },
  })
  const { handleSubmit, setValue, setError, reset } = methods

  const {
    isLoading,
    success,
    errors: supplierErrors,
    supplier,
  } = useAppSelector(state => state.supplier)

  const onSubmit = (values: TSupplierForm) => {
    if (router.query.addEdit === 'add') dispatch(addSupplier(values))
    else dispatch(editSupplier(router.query.addEdit as string, values))
  }

  useEffect(() => {
    if (router.query.addEdit && router.query.addEdit !== 'add')
      dispatch(getSupplier(router.query.addEdit as string))
    else reset()
  }, [router.query.addEdit])

  useEffect(() => {
    if (supplier)
      Object.keys(supplier).map(key =>
        setValue(key as keyof TSupplierForm, supplier[key as 'phone'])
      )
  }, [supplier])

  useEffect(() => {
    if (success) {
      reset()
      router.push({ pathname: '/suppliers/list', query: { page: 1, limit: 10 } })
    }
  }, [success])

  useEffect(() => {
    if (supplierErrors?.length)
      supplierErrors.map(item =>
        setError(item.path as keyof TSupplierForm, { type: 'custom', message: item.msg })
      )
  }, [supplierErrors])

  return (
    <FormProvider {...methods}>
      <Box>
        <Flex justifyContent='space-between'>
          <Heading mb={4}>
            {t(router.query.addEdit === 'add' ? 'add_supplier' : 'edit_supplier')}
          </Heading>
          <Button as={Link} href='/suppliers/list?page=1&limit=10'>
            {t('go_to_suppliers')}
          </Button>
        </Flex>
        {router.query.addEdit !== 'add' ? (
          <Alert status='warning' borderRadius={6} mb={3}>
            <AlertIcon />
            {t('alert_autocomplete')}
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddEditCard />
          <AddEditAction />
        </form>
      </Box>
    </FormProvider>
  )
}

export default AddEditSupplier
