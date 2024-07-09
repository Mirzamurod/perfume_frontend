import { UserDataType } from '@/types/user'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import Link from 'next/link'

export const AvatarBox = ({ collapse, user }: { collapse: boolean; user: UserDataType }) => (
  <Flex
    w='full'
    p={2}
    alignItems='center'
    justifyContent='space-between'
    gap={2}
    flexDirection={collapse ? 'row' : 'column-reverse'}
  >
    {collapse ? (
      <Text fontSize='xl' fontWeight='bold' pb='0' lineHeight={0}>
        {user.phone}
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
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
)
