import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addSetting, editSetting, getSetting } from '@/store/setting'
import { Box, Button, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { TInputType } from '@/types/input'
import Input from '@/components/Input'
import { TSetting } from '@/types/setting'
import { useAppSelector } from '@/store'

const Settings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const formSchema = yup.object().shape({ botId: yup.string(), groupId: yup.string() })
  const methods = useForm<TSetting>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { botId: '', groupId: '' },
  })
  const { handleSubmit, setValue, setError } = methods

  const { isLoading, setting, errors } = useAppSelector(state => state.setting)

  const inputs: TInputType[] = [{ name: 'botId' }, { name: 'groupId' }]

  const onSubmit = (values: TSetting) => {
    if (setting) dispatch(editSetting(values))
    else dispatch(addSetting(values))
  }

  useEffect(() => {
    if (setting)
      Object.keys(setting).map(key => {
        setValue(key as keyof TSetting, setting[key as 'botId'])
      })
  }, [setting])

  useEffect(() => {
    if (errors?.length)
      errors.map(item =>
        setError(item.path as keyof TSetting, { type: 'custom', message: item.msg })
      )
  }, [errors])

  useEffect(() => {
    dispatch(getSetting())
  }, [])

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack mb={4} justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }}>
          <Heading>{t('settings')}</Heading>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            gap={4}
            templateColumns={{
              xl: 'repeat(3, 1fr)',
              lg: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)',
              base: 'repeat(1, 1fr)',
            }}
          >
            {inputs.map(item => (
              <GridItem key={item.name}>
                <Input {...item} />
              </GridItem>
            ))}
          </Grid>
          <Flex mt={4} justifyContent='end'>
            <Button
              type='submit'
              variant='outline'
              colorScheme='teal'
              isLoading={isLoading}
              loadingText={t(setting ? 'edit_setting' : 'add_setting')}
            >
              {t(setting ? 'edit_setting' : 'add_setting')}
            </Button>
          </Flex>
        </form>
      </Box>
    </FormProvider>
  )
}

export default Settings
