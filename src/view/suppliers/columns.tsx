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
import { TSupplier } from '@/types/supplier'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.name || '-'}</Text>,
  },
  { field: 'phone', headerName: 'phone' },
  {
    isNumeric: true,
    field: 'orders',
    headerName: 'orders',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.orders || 0}</Text>,
  },
  {
    isNumeric: true,
    field: 'finished_orders',
    headerName: 'finished_orders',
    renderCell: ({ row }: { row: TSupplier }) => <Text>{row.finished_orders || 0}</Text>,
  },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TSupplier }) => {
      const { onOpen, onClose, isOpen } = useDisclosure()
      const { t } = useTranslation()

      return (
        <>
          <Tooltip label={t('edit_supplier')}>
            <IconButton
              mr={3}
              icon={<EditIcon />}
              aria-label={t('edit_supplier')}
              as={Link}
              href={`/suppliers/${row._id}`}
            />
          </Tooltip>
          <Popover placement='left'>
            <PopoverTrigger>
              <Tooltip label={t('delete_supplier')}>
                <IconButton icon={<DeleteIcon />} aria-label={t('delete_supplier')} />
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
