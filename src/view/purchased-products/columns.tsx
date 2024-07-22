import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Text } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon } from '@chakra-ui/icons'
import { TPurchasedProduct } from '@/types/purchasedProduct'
import DeletePopover from '@/components/DeletePopover'
import { deletePurchasedProduct } from '@/store/purchased_product'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TPurchasedProduct }) => <Text>{row.product.name}</Text>,
  },
  { field: 'count', headerName: 'count', isNumeric: true },
  { field: 'purchased_price', headerName: 'purchased_price', isNumeric: true },
  { field: 'sale_price', headerName: 'sale_price', isNumeric: true },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TPurchasedProduct }) => {
      const { t } = useTranslation()

      return (
        <>
          <Tooltip label={t('edit_purchased_product')}>
            <IconButton
              mr={3}
              icon={<EditIcon />}
              aria-label={t('edit_purchased_product')}
              as={Link}
              href={`/purchased-products/${row._id}`}
            />
          </Tooltip>
          <DeletePopover
            data={row}
            selector='purchased_product'
            deleteAction={deletePurchasedProduct}
            label='delete_purchased_product'
          />
        </>
      )
    },
  },
]

export default columns
