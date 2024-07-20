import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button, Flex } from '@chakra-ui/react'
import { useAppSelector } from '@/store'

const AddEditAction = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { isLoading } = useAppSelector(state => state.supplier)

  return (
    <Flex mt={4} justifyContent='end'>
      <Button
        type='submit'
        variant='outline'
        colorScheme='teal'
        isLoading={isLoading}
        loadingText={t(router.query.addEdit === 'add' ? 'add_supplier' : 'edit_supplier')}
      >
        {t(router.query.addEdit === 'add' ? 'add_supplier' : 'edit_supplier')}
      </Button>
    </Flex>
  )
}

export default AddEditAction
