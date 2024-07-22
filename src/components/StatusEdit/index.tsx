import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { TOrder } from '@/types/order'
import { useAppSelector } from '@/store'
import { editOrder } from '@/store/order'

interface IProps {
  order: TOrder
}

const StatusEdit: FC<IProps> = props => {
  const { order } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [supplier, setSupplier] = useState<string | undefined>(order.supplier?._id)

  const { suppliers } = useAppSelector(state => state.supplier)
  const { success } = useAppSelector(state => state.order)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onOpen()
    setSupplier(event.target.value)
  }

  const cancel = () => {
    setSupplier(order.supplier?._id ?? '')
    onClose()
  }

  // @ts-ignore
  const confirm = () => dispatch(editOrder(order._id, { supplierId: supplier! }))

  useEffect(() => {
    if (success) onClose()
  }, [success])

  return (
    <Box>
      <Select value={supplier} onChange={onChange} width='auto'>
        <option value=''>{t('choose_supplier')}</option>
        {suppliers.map(supplier => (
          <option value={supplier._id} key={supplier._id}>{supplier?.name || supplier?.phone}</option>
        ))}
      </Select>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {order.supplier
              ? 'Are you sure you want to change supplier?'
              : 'Are you sure you want to give this order to this supplier?'}
          </ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>
            <Text>Rostan ham </Text>
          </ModalBody> */}
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={cancel}>
              Close
            </Button>
            <Button variant='outline' colorScheme='teal' onClick={confirm}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default StatusEdit
