import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Input } from '@chakra-ui/react'

interface IProps {
  search: string
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { search, setSearch } = props
  const { t } = useTranslation()

  return (
    <Flex justifyContent='space-between' mb={4}>
      <Input
        placeholder={t('search')}
        width='auto'
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <Button
        colorScheme='teal'
        variant='outline'
        leftIcon={<AddIcon />}
        as={Link}
        href='/orders/add'
      >
        {t('add_order')}
      </Button>
    </Flex>
  )
}

export default TableHeader
