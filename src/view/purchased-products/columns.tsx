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
} from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TPurchasedProduct }) => {
      const { onOpen, onClose, isOpen } = useDisclosure()
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
        </>
      )
    },
  },
]

export default columns
