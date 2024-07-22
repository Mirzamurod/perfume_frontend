import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { UserDataType } from '@/types/user'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { deleteUser } from '@/store/user/login'

export const AvatarBox = ({ collapse, user }: { collapse: boolean; user: UserDataType }) => {
  const dispatch = useDispatch()

  return (
    <Flex
      w='full'
      pt={2}
      alignItems='center'
      justifyContent='space-between'
      gap={2}
      flexDirection={collapse ? 'row' : 'column-reverse'}
    >
      {collapse ? (
        <Text fontSize='xl' fontWeight='bold' pb={0} lineHeight={0}>
          {user.name || user.phone}
        </Text>
      ) : null}

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Settings'
          icon={<MdOutlineMoreHoriz />}
          borderRadius='full'
          color='gray.400'
          variant='ghost'
          fontSize={20}
        />
        <MenuList>
          <MenuItem as={Link} href='/profile'>
            Profile
          </MenuItem>
          <MenuItem onClick={() => dispatch(deleteUser())}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
