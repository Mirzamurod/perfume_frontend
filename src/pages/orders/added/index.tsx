import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import Table from '@/components/Table'
import { TSortModel } from '@/types/table'
import { useAppSelector } from '@/store'
import { getOrders } from '@/store/order'
import TableHeader from '@/view/orders/status/TableHeader'
import columns from '@/view/orders/status/columns'

const AddedOrders = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [ordering, setOrdering] = useState<TSortModel | null>(null)
  const [search, setSearch] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const debounceTimeout = useRef<NodeJS.Timeout | number | null>(null)

  const { orders, isLoading, pageCount, success } = useAppSelector(state => state.order)

  useEffect(() => {
    dispatch(
      getOrders({
        status: 'added',
        page: router.query.page || 1,
        limit: router.query.limit || 10,
        sortName: ordering?.field,
        sortValue: ordering?.sort,
        search: inputValue,
      })
    )
  }, [router.query.page, router.query.limit, ordering, inputValue])

  useEffect(() => {
    if (success)
      dispatch(
        getOrders({
          status: 'added',
          page: router.query.page || 1,
          limit: router.query.limit || 10,
          sortName: ordering?.field,
          sortValue: ordering?.sort,
          search: inputValue,
        })
      )
  }, [router.query.page, router.query.limit, ordering, inputValue, success])

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current as number)
    }

    debounceTimeout.current = setTimeout(() => {
      setInputValue(search)
    }, 2000)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current as number)
    }
  }, [search])

  const onChange = (item: { [value: string]: string | string[] | number }) =>
    router.replace({ query: { ...router.query, ...item } }, undefined, { shallow: true })

  return (
    <Box>
      <TableHeader search={search} setSearch={setSearch} heading='orders' />
      <Table
        data={orders}
        columns={columns}
        loading={isLoading}
        pageCount={pageCount}
        sortModel={ordering}
        paginationModel={{
          page: (+router.query.page! || 1) - 1,
          pageSize: +router.query.limit! || 10,
        }}
        onPaginationModelChange={newItem =>
          onChange({ page: newItem.page, limit: newItem.pageSize })
        }
        onSortModelChange={sort => setOrdering(sort)}
      />
    </Box>
  )
}

export default AddedOrders
