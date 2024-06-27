import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from '@chakra-ui/react'
import { TRegister } from '@/types/register'
import { userLogin } from '@/store/user/login'
import { useAppSelector } from '@/store'
import { useEffect } from 'react'

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const formSchema = yup.object().shape({
    phone: yup.string().required(t('phone_required')),
    password: yup.string().required(t('password_required')),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { phone: '', password: '' },
  })

  const { errors: loginErrors } = useAppSelector(state => state.login)

  useEffect(() => {
    if (loginErrors?.length)
      loginErrors?.map(item =>
        setError(item.path as 'phone', { type: 'value', message: t(item.msg) })
      )
  }, [loginErrors])

  const onSubmit = (values: TRegister) => {
    dispatch(userLogin(values))
  }

  return (
    <Box __css={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isInvalid={!!errors.phone?.message}>
              <Input type='tel' placeholder={t('phone')} {...register('phone')} />
              {errors.phone?.type ? (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <Input type='password' placeholder={t('password')} {...register('password')} />
              {errors.password?.type ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : null}
            </FormControl>
            <Button variant='outline' type='submit'>
              Login
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  )
}

Login.guestGuard = true

export default Login
