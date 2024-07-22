import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Text, HStack } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import { TOrder } from '@/types/order'
import StatusEdit from '@/components/StatusEdit'
import DeletePopover from '@/components/DeletePopover'
import { deleteOrder } from '@/store/order'

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
    // renderCell: ({ row }: { row: TOrder }) => <StatusEdit order={row} />,
    renderCell: ({ row }: { row: TOrder }) => <Text>{row.supplier?._id}</Text>,
  },
  {
    field: 'status',
    headerName: 'status',
    renderCell: ({ row }: { row: TOrder }) => <Text>{row.status}</Text>,
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
          {/* <Tooltip label={t('edit_order')}>
            <IconButton
              icon={<EditIcon />}
              aria-label={t('edit_order')}
              as={Link}
              href={`/orders/${row._id}`}
            />
          </Tooltip>
          <DeletePopover
            data={row}
            selector='order'
            deleteAction={deleteOrder}
            label='delete_order'
          /> */}
        </HStack>
      )
    },
  },
]

export default columns
