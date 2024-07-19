import { TColumns } from '@/types/table'

const columns: TColumns[] = [
  { field: 'name', headerName: 'name' },
  { field: 'type', headerName: 'type' },
  { field: 'gender', headerName: 'gender' },
  { field: 'color', headerName: 'color' },
  { field: 'season', headerName: 'season' },
  { field: 'smell', headerName: 'smell' },
  { field: 'persistence_of_the_smell', headerName: 'persistence_of_the_smell', isNumeric: true },
]

export default columns
