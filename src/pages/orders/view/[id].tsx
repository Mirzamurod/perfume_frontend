import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  RulerControl,
  TypeSelector,
  YMaps,
  ZoomControl,
} from 'react-yandex-maps'
import { Box, Button, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import { getOrder } from '@/store/order'
import { useAppSelector } from '@/store'
import Table from '@/components/Table'
import columns from '@/view/order/columns'
import Link from 'next/link'

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
      <Flex justifyContent='space-between'>
        <Heading>{t('order')}</Heading>
        <Button onClick={() => router.back()}>{t('go_to_orders')}</Button>
      </Flex>
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
              <Text fontSize='xl' as={Link} href={`tel:${order?.phone}`}>
                {order?.phone}
              </Text>
              {/* <Link href={`tel:${order?.phone}`}>{order?.phone}</Link> */}
            </Flex>
            <Flex mt={1}>
              <Text fontSize='xl'>{t('delivery_date')}: &nbsp;</Text>
              <Text fontSize='xl'>{order?.delivery_date?.toString().slice(0, 10)}</Text>
            </Flex>
            <Flex mt={1}>
              <Text fontSize='xl'>{t('supplier')}: &nbsp;</Text>
              <Text fontSize='xl'>{order?.supplier?.name || order?.supplier?.phone}</Text>
            </Flex>
          </>
        )}
        <Box mt={3}>
          <Table
            data={
              order?.perfumes!.map(item => {
                return { ...item.perfume, qty: item.qty }
              }) ?? []
            }
            columns={columns}
            loading={isLoading}
            footerPagination={false}
          />
        </Box>
        <Box mt={3}>
          {order?.location?.length ? (
            <YMaps>
              <Map
                width='100%'
                height={400}
                defaultState={{ center: [41.31374, 69.245061], zoom: 11 }}
              >
                <FullscreenControl />
                <GeolocationControl options={{ float: 'right' }} />
                <RulerControl />
                <TypeSelector options={{ float: 'right' }} />
                <ZoomControl />
                <Placemark geometry={order?.location} />
              </Map>
            </YMaps>
          ) : null}
        </Box>
        <Flex mt={4} justifyContent='end'>
          <Button variant='outline' colorScheme='teal' onClick={() => router.back()}>
            {t('go_to_orders')}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ViewOrder
