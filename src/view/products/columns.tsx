import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon } from '@chakra-ui/icons'
import { TProduct } from '@/types/product'
import { deleteProduct } from '@/store/product'
import DeletePopover from '@/components/DeletePopover'

const columns: TColumns[] = [
  { field: 'name', headerName: 'name' },
  { field: 'type', headerName: 'type' },
  { field: 'color', headerName: 'color' },
  { field: 'season', headerName: 'season' },
  { field: 'gender', headerName: 'gender' },
  { field: 'smell', headerName: 'smell' },
  { field: 'persistence_of_the_smell', headerName: 'persistence_of_the_smell', isNumeric: true },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TProduct }) => {
      const { t } = useTranslation()

      return (
        <>
          <Tooltip label={t('edit_product')}>
            <IconButton
              mr={3}
              icon={<EditIcon />}
              aria-label={t('edit_product')}
              as={Link}
              href={`/products/${row._id}`}
            />
          </Tooltip>
          <DeletePopover
            data={row}
            selector='product'
            deleteAction={deleteProduct}
            label='delete_product'
          />
        </>
      )
    },
  },
]

export default columns
