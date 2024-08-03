import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
  IconButton,
  Tooltip,
  Text,
  FormControl,
  Switch,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { TColumns } from '@/types/table'
import { EditIcon } from '@chakra-ui/icons'
import { useAppSelector } from '@/store'
import { TUser } from '@/types/users'

const columns: TColumns[] = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: { row: TUser }) => <Text>{row.name || '-'}</Text>,
  },
  { field: 'phone', headerName: 'phone' },
  { field: 'role', headerName: 'role' },
  {
    field: 'block',
    headerName: 'block',
    isNumeric: true,
    renderCell: ({ row }: { row: TUser }) => {
      const { t } = useTranslation()
      const dispatch = useDispatch()
      const { onOpen, onClose, isOpen } = useDisclosure()

      const { success } = useAppSelector(state => state.supplier)

      const confirm = () => console.log(row._id)

      useEffect(() => {
        if (success) onClose()
      }, [success])

      return (
        <Popover placement='left' isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <FormControl>
              <Switch id='email-alerts' isChecked={row.block} onChange={onOpen} />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent textAlign='start'>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight='semibold'>{t('confirmation')}</PopoverHeader>
            <PopoverBody>{t('want_to_change')}</PopoverBody>
            <PopoverFooter display='flex' justifyContent='flex-end'>
              <ButtonGroup size='sm'>
                <Button colorScheme='red' variant='outline' onClick={confirm}>
                  {t('yes')}
                </Button>
                <Button variant='outline' onClick={onClose}>
                  {t('no')}
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    field: 'action',
    headerName: 'action',
    isNumeric: true,
    renderCell: ({ row }: { row: TUser }) => {
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
          {/* <DeletePopover
            data={row}
            selector='supplier'
            deleteAction={deleteSupplier}
            label='delete_supplier'
          /> */}
        </>
      )
    },
  },
]

export default columns
