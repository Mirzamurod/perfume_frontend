import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Text } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon } from '@chakra-ui/icons'
import { TSupplier } from '@/types/supplier'
import DeletePopover from '@/components/DeletePopover'
import { deleteSupplier } from '@/store/supplier'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.name || '-'}</Text>,
  },
  { field: 'phone', headerName: 'phone' },
  {
    isNumeric: true,
    field: 'orders',
    headerName: 'orders',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.orders || 0}</Text>,
  },
  {
    isNumeric: true,
    field: 'finished_orders',
    headerName: 'finished_orders',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.finished_orders || 0}</Text>,
  },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TSupplier }) => {
      const { t } = useTranslation()

      return (
        <>
          <Tooltip label={t('edit_supplier')}>
            <IconButton
              mr={3}
              icon={<EditIcon />}
              aria-label={t('edit_supplier')}
              as={Link}
              href={`/suppliers/${row._id}`}
            />
          </Tooltip>
          <DeletePopover
            data={row}
            selector='supplier'
            deleteAction={deleteSupplier}
            label='delete_supplier'
          />
        </>
      )
    },
  },
]

export default columns
