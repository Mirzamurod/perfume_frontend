import { StyleProps, TableCellProps } from '@chakra-ui/react'

export type TTable = {
  data: any[]
  columns: TColumns[]
  loading?: boolean
  pageCount?: number
  pageSizeOptions?: number[]
  sortModel?: TSortModel | null
  onSortModelChange?: (value: TSortModel | null) => void
  paginationModel?: { page: number; pageSize: number }
  onPaginationModelChange?: (value: { page: number; pageSize: number }) => void
}

export type TColumns = {
  field: string
  headerName: string
  renderCell?: (value: any) => any
} & StyleProps &
  TableCellProps

export type TSortModel = { field: string; sort: 'asc' | 'desc' }
