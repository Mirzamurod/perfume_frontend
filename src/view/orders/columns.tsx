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
  VStack,
  Stack,
} from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { TOrder } from '@/types/order'

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
