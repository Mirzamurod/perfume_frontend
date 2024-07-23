import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import { useAppSelector } from '@/store'

interface IProps {
  heading: string
  search: string
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { heading, search, setSearch } = props
  const { t } = useTranslation()

  const { user } = useAppSelector(state => state.login)

  return (
    <Box>
      <Heading>{t(heading)}</Heading>
      <Flex justifyContent='space-between' my={4}>
        <Input
          placeholder={t('search')}
          width='auto'
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
        {user?.role === 'client' ? (
          <Button
            colorScheme='teal'
            variant='outline'
            leftIcon={<AddIcon />}
            as={Link}
            href='/orders/add'
          >
            {t('add_order')}
          </Button>
        ) : null}
      </Flex>
    </Box>
  )
}

export default TableHeader
