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
} from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { TProduct } from '@/types/product'

const columns: TColumns[] = [
  { field: 'name', headerName: 'name' },
  { field: 'phone', headerName: 'phone' },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TProduct }) => {
      const { onOpen, onClose, isOpen } = useDisclosure()
      const { t } = useTranslation()

      return (
        <>
          <Tooltip label={t('edit_product')}>
            <IconButton
              mr={3}
              icon={<EditIcon />}
              aria-label={t('edit_product')}
              as={Link}
              href={`/products/${row._id}`}
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
