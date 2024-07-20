import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverArrow,
  Button,
  Flex,
  useDisclosure,
  Tooltip,
  Text,
  HStack,
  Box,
  Select,
} from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { TOrder } from '@/types/order'
import { useAppSelector } from '@/store'

const columns: TColumns[] = [
  { field: 'name', headerName: 'name' },
  { field: 'phone', headerName: 'phone' },
  {
    field: 'products',
    headerName: 'products',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => <Text>{row.perfumes.length}</Text>,
  },
  {
    field: 'delivery_date',
    headerName: 'delivery_date',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => (
      <Text>{row.delivery_date?.toString().slice(0, 10)}</Text>
    ),
  },
  {
    field: 'supplier',
    headerName: 'supplier',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => {
      const { t } = useTranslation()
      const { suppliers } = useAppSelector(state => state.supplier)

      return (
        <Box>
          <Select value={row.supplier?._id} width='auto'>
            <option value=''>{t('choose_supplier')}</option>
            {suppliers.map(supplier => (
              <option value={supplier._id}>{row.supplier?.name || row.supplier?.phone}</option>
            ))}
          </Select>
        </Box>
      )
    },
  },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TOrder }) => {
      const { onOpen, onClose, isOpen } = useDisclosure()
      const { t } = useTranslation()

      return (
        <HStack justifyContent='end'>
          <Tooltip label={t('view_product')}>
            <IconButton
              icon={<ViewIcon />}
              aria-label={t('view_product')}
              as={Link}
              href={`/orders/view/${row._id}`}
            />
          </Tooltip>
          <Tooltip label={t('edit_product')}>
            <IconButton
              icon={<EditIcon />}
              aria-label={t('edit_product')}
              as={Link}
              href={`/orders/${row._id}`}
            />
          </Tooltip>
          <Popover placement='left'>
            <PopoverTrigger>
              <Tooltip label={t('delete_product')}>
                <IconButton icon={<DeleteIcon />} aria-label={t('delete_product')} />
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent textAlign='start'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>are you sure you want to delete?</PopoverHeader>
              <PopoverBody>
                <Flex justifyContent='space-between'>
                  <Button colorScheme='red' variant='outline'>
                    {t('delete')}
                  </Button>
                  <Button variant='outline'>{t('close')}</Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      )
    },
  },
]

export default columns
// row.supplier?.name || row.supplier?.phone
