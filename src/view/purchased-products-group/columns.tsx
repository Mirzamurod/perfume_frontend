import { useState } from 'react'
import { IconButton, Text, Tooltip } from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { TPurchasedProduct } from '@/types/purchasedProduct'
import { CheckIcon, LinkIcon } from '@chakra-ui/icons'
import { t } from '@/languages/Eng'
import { useAppSelector } from '@/store'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TPurchasedProduct }) => <Text>{row.product.name}</Text>,
  },
  { field: 'count', headerName: 'count', isNumeric: true },
  { field: 'sale_price', headerName: 'sale_price', isNumeric: true },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TPurchasedProduct }) => {
      const [clicked, setClicked] = useState(false)
      const { user } = useAppSelector(state => state.login)

      const onClick = () => {
        navigator.clipboard.writeText(
          `http://localhost:3000/add-order?user=${user?._id}&product=${row._id}`
        )
        setClicked(true)

        setTimeout(() => {
          setClicked(false)
        }, 1000)
      }

      return (
        <Tooltip label={t('copy_link')}>
          <IconButton
            aria-label='Copy'
            icon={clicked ? <CheckIcon /> : <LinkIcon />}
            onClick={onClick}
          />
        </Tooltip>
      )
    },
  },
]

export default columns
