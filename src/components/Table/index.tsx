import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'next-i18next'
import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Spinner,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { TTable } from '@/types/table'

const Table: FC<TTable> = props => {
  const {
    data,
    columns,
    loading,
    pageCount,
    sortModel,
    paginationModel,
    onSortModelChange,
    onPaginationModelChange,
    pageSizeOptions = [10, 20, 50],
  } = props
  const { t } = useTranslation()

  const changeSort = (field: string) => {
    if (!sortModel) onSortModelChange!({ field, sort: 'asc' })
    else {
      if (sortModel.field === field) {
        if (sortModel.sort === 'asc') onSortModelChange!({ field, sort: 'desc' })
        else onSortModelChange!(null)
      } else onSortModelChange!({ field, sort: 'asc' })
    }
  }

  return (
    <Box>
      <TableContainer>
        <ChakraTable variant='simple'>
          <Thead>
            <Tr>
              {columns.map((column, index) => (
                <Th
                  {...column}
                  key={column.field}
                  onClick={() => !column.renderCell && changeSort(column.field)}
                  _hover={{ cursor: 'pointer' }}
                >
                  {column.headerName}{' '}
                  {sortModel?.field === column.field ? (
                    sortModel.sort === 'asc' ? (
                      <TriangleDownIcon />
                    ) : (
                      <TriangleUpIcon />
                    )
                  ) : null}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {loading || (!loading && !data.length) ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <Flex alignItems='center' justifyContent='center'>
                    {loading ? (
                      <>
                        <Spinner /> <Text ml={3}>Loading...</Text>
                      </>
                    ) : (
                      <Text>{t('no_data')}</Text>
                    )}
                  </Flex>
                </Td>
              </Tr>
            ) : (
              data.map(item => (
                <Tr key={item.id}>
                  {columns.map((column, index) => (
                    <Td {...column} key={index}>
                      {column.renderCell ? column.renderCell({ row: item }) : item[column.field]}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <Flex mt={6} alignItems='center' justifyContent='end'>
        <Select
          variant='outline'
          width='auto'
          value={paginationModel?.pageSize ?? 10}
          onChange={({ target }) => onPaginationModelChange!({ page: 1, pageSize: +target.value })}
        >
          {pageSizeOptions?.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>
        <ReactPaginate
          previousLabel='<'
          nextLabel='>'
          breakLabel='...'
          initialPage={paginationModel?.page!}
          pageCount={pageCount! ?? 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={({ selected }) =>
            onPaginationModelChange!({
              page: selected! + 1,
              pageSize: paginationModel?.pageSize!,
            })
          }
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
        />
      </Flex>
    </Box>
  )
}

export default Table
