import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Text, HStack, Select, Button } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import { TOrder, TOrderStatus } from '@/types/order'
import StatusEdit from '@/components/StatusEdit'
import DeletePopover from '@/components/DeletePopover'
import { deleteOrder, editOrder } from '@/store/order'
import { useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'

const status_colors: {
  accepted: string
  on_the_way: string
  sold: string
  cancelled: string
  added: string
} = {
  accepted: 'blue.500',
  on_the_way: 'yellow.500',
  sold: 'green.500',
  cancelled: 'red.500',
  added: '',
}

const columns: TColumns[] = [
  { field: 'name', headerName: 'name' },
  { field: 'phone', headerName: 'phone' },
  {
    field: 'products',
    headerName: 'products',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => <Text>{row.perfumes.length}</Text>,
  },
  { field: 'payment_method', headerName: 'payment_method' },
  {
    field: 'delivery_date',
    headerName: 'delivery_date',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => (
      <Text>{row.delivery_date?.toString().slice(0, 10)}</Text>
    ),
  },
  {
    field: 'supplier',
    headerName: 'supplier',
    renderCell: ({ row }: { row: TOrder }) => (
      <Text>{row.supplier?.name || row.supplier?.phone}</Text>
    ),
  },
  {
    field: 'status',
    headerName: 'status',
    renderCell: ({ row }: { row: TOrder }) => {
      const { t } = useTranslation()
      const dispatch = useDispatch()

      const { user } = useAppSelector(state => state.login)

      // @ts-ignore
      const onChange = (status: TOrderStatus) => dispatch(editOrder(row._id, { status }))

      // @ts-ignore
      return row.status === 'added' ? (
        <Button variant='outline' colorScheme='cyan' onClick={() => onChange('accepted')}>
          Saw
        </Button>
      ) : (
        // @ts-ignore
        <Select value={row.status} onChange={({ target }) => onChange(target.value as TOrderStatus)}>
          <option value='accepted' disabled={user?.role === 'client'}>
            {t('accepted')}
          </option>
          <option value='on_the_way' disabled={user?.role === 'client'}>
            {t('on_the_way')}
          </option>
          <option value='sold' disabled={user?.role === 'client'}>
            {t('sold')}
          </option>
          <option value='cancelled'>{t('cancelled')}</option>
        </Select>
      )
    },
  },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => {
      const { t } = useTranslation()

      return (
        <HStack justifyContent='end'>
          <Tooltip label={t('view_order')}>
            <IconButton
              icon={<ViewIcon />}
              aria-label={t('view_order')}
              as={Link}
              href={`/orders/view/${row._id}`}
            />
          </Tooltip>
        </HStack>
      )
    },
  },
]

export default columns
