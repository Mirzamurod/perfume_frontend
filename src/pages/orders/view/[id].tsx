import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, Button, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import { getOrder } from '@/store/order'
import { useAppSelector } from '@/store'
import Table from '@/components/Table'
import columns from '@/view/order/columns'

const ViewOrder = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { isLoading, order } = useAppSelector(state => state.order)

  useEffect(() => {
    if (router.query.id) dispatch(getOrder(router.query.id as string))
  }, [])

  return (
    <Box>
      <Heading>{t('order')}</Heading>
      <Box mt={3}>
        {isLoading ? (
          <>
            <Skeleton height='25px' width='250px' />
            <Skeleton height='25px' width='250px' mt={3} />
          </>
        ) : (
          <>
            <Flex>
              <Text fontSize='xl'>{t('name')}: &nbsp;</Text>
              <Text fontSize='xl'>{order?.name}</Text>
            </Flex>
            <Flex mt={1}>
              <Text fontSize='xl'>{t('phone')}: &nbsp;</Text>
              <Text fontSize='xl'>{order?.phone}</Text>
            </Flex>
          </>
        )}
        <Box mt={3}>
          <Table
            data={order?.perfumes!.map(item => item.perfume) ?? []}
            columns={columns}
            loading={isLoading}
            footerPagination={false}
          />
        </Box>
        <Flex mt={4} justifyContent='end'>
          <Button
            as={Link}
            variant='outline'
            colorScheme='teal'
            href='/orders/list?page=1&limit=10'
          >
            {t('go_to_orders')}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ViewOrder
