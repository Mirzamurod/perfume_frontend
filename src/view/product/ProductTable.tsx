import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, IconButton } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useAppSelector } from '@/store'
import Table from '@/components/Table'
import { TColumns, TSortModel } from '@/types/table'
import { TProduct } from '@/types/product'
import { getProducts } from '@/store/product'
import Link from 'next/link'

const ProductTable = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [ordering, setOrdering] = useState<TSortModel | null>(null)

  const { products, isLoading, pageCount } = useAppSelector(state => state.product)

  useEffect(() => {
    dispatch(getProducts({ ...router.query, sortName: ordering?.field, sortValue: ordering?.sort }))
  }, [router.query, ordering])

  const columns: TColumns[] = [
    {
      field: 'name',
      headerName: 'name',
      renderCell: ({ row }: { row: TProduct }) => <Box>{`${row.name} ${row.type}`}</Box>,
    },
    {
      field: 'color',
      headerName: 'color',
    },
    {
      field: 'season',
      headerName: 'season',
    },
    {
      field: 'sale_price',
      headerName: 'sale_price',
      isNumeric: true,
    },
    {
      field: 'action',
      headerName: 'action',
      isNumeric: true,
      renderCell: ({ row }: { row: TProduct }) => (
        <IconButton icon={<EditIcon />} aria-label='edit product' as={Link} href={`/products/${row._id}`} />
      ),
    },
  ]

  const onChange = (item: { [value: string]: string | string[] | number }) =>
    router.replace({ query: { ...router.query, ...item } }, undefined, { shallow: true })

  return (
    <Box>
      <Table
        data={products}
        columns={columns}
        loading={isLoading}
        pageCount={pageCount}
        sortModel={ordering}
        paginationModel={{ page: +router.query.page! - 1, pageSize: +router.query.limit! }}
        onPaginationModelChange={newItem =>
          onChange({ page: newItem.page, limit: newItem.pageSize })
        }
        onSortModelChange={sort => setOrdering(sort)}
      />
    </Box>
  )
}

export default ProductTable
