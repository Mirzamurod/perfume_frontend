import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ListIcon, Link as LinkChakra, Heading, Box, Badge, Text } from '@chakra-ui/react'
import { TNavbar } from '@/types/navbar'

const NavItem = ({ item, collapse }: { item: TNavbar; collapse: boolean }) => {
  const { label } = item
  const router = useRouter()
  const { t } = useTranslation()

  if (item.type === 'link') {
    const { icon, notifications, path } = item

    return (
      <Box display='flex' alignItems='center' my={1} justifyContent='center'>
        <LinkChakra
          href={path}
          as={Link}
          gap={1}
          p={2}
          display='flex'
          alignItems='center'
          _hover={{ textDecoration: 'none', bgColor: '#8585853d', p: 2 }}
          fontWeight={router.pathname === path ? 'bold' : 'medium'}
          // color={isActive ? 'black' : 'gray.400'}
          w='full'
          bgColor={router.pathname === path ? '#8585853d' : ''}
          borderRadius={6}
          justifyContent={!collapse ? 'center' : ''}
        >
          <ListIcon as={icon} fontSize={22} m='0' />
          {collapse && <Text>{t(label)}</Text>}
        </LinkChakra>
        {collapse ? (
          notifications ? (
            <Badge borderRadius='full' colorScheme='yellow' w={6} textAlign='center'>
              {notifications}
            </Badge>
          ) : null
        ) : null}
      </Box>
    )
  }

  return (
    <Heading
      color='gray.400'
      fontWeight='medium'
      textTransform='uppercase'
      fontSize='sm'
      borderTopWidth={1}
      borderColor='gray.100'
      pt={collapse ? 8 : 0}
      my={6}
    >
      <Text display={collapse ? 'flex' : 'none'}>{label}</Text>
    </Heading>
  )
}

export default NavItem
