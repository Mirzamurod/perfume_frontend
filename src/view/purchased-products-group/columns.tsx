import { Text } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { TPurchasedProduct } from '@/types/purchasedProduct'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TPurchasedProduct }) => <Text>{row.product.name}</Text>,
  },
  { field: 'count', headerName: 'count', isNumeric: true },
  { field: 'purchased_price', headerName: 'purchased_price', isNumeric: true },
  { field: 'sale_price', headerName: 'sale_price', isNumeric: true },
]

export default columns
