import { useTranslation } from 'next-i18next'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Input } from '@chakra-ui/react'
import Link from 'next/link'

const TableHeader = () => {
  const { t } = useTranslation()

  return (
    <Flex justifyContent='space-between' mb={4}>
      <Input placeholder={t('search')} width='auto' />
      <Button
        colorScheme='teal'
        variant='outline'
        leftIcon={<AddIcon />}
        as={Link}
        href='/products/add'
      >
        {t('add_perfume')}
      </Button>
    </Flex>
  )
}

export default TableHeader
