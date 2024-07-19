import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'

interface IProps {
  search: string
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { search, setSearch } = props
  const { t } = useTranslation()

  return (
    <Box>
      <Heading mb={2}>{t('suppliers')}</Heading>
      <Flex justifyContent='space-between' mb={4}>
        <Input
          width='auto'
          value={search}
          placeholder={t('search')}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button
          as={Link}
          variant='outline'
          colorScheme='teal'
          leftIcon={<AddIcon />}
          href='/suppliers/add'
        >
          {t('add_supplier')}
        </Button>
      </Flex>
    </Box>
  )
}

export default TableHeader
