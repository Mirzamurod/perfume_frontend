import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react'

interface IProps {
  search: string
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { search, setSearch } = props
  const { t } = useTranslation()

  return (
    <Box>
      <Heading mb={2}>{t('products')}</Heading>
      <Stack mb={4} justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }}>
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
          href='/products/add'
        >
          {t('add_product')}
        </Button>
      </Stack>
    </Box>
  )
}

export default TableHeader
