import { FC, useState } from 'react'
import i18next from 'i18next'
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { TbPerfume } from 'react-icons/tb'
import { IBlankLayoutWithSidebar } from '@/types/blankLayout'
import navbar from '@/navigation/vertical'
import NavItem from './NavItem'
import { AvatarBox } from './AvatarBox'
import { MdMenu, MdOutlineDarkMode, MdSunny } from 'react-icons/md'
import { useAppSelector } from '@/store'
import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/language'

const BlankLayoutWithSidebar: FC<IBlankLayoutWithSidebar> = props => {
  const { children } = props
  const { colorMode, toggleColorMode } = useColorMode()
  const { language, setLanguage } = useLanguage()
  const [collapse, setCollapse] = useState(true)

  const { user } = useAppSelector(state => state.login)

  const selectLang = ({ lang, name }: Language) => {
    i18next.changeLanguage(lang)
    setLanguage({ lang, name })
  }

  return (
    <HStack w='full' h='100vh' padding={5}>
      {/* Sidebar */}
      <Flex
        as='aside'
        w='full'
        h='full'
        maxW={collapse ? 350 : 100}
        border='1px'
        alignItems='start'
        padding={6}
        flexDirection='column'
        justifyContent='space-between'
        transition='ease-in-out .2s'
        borderRadius='2xl'
      >
        <Box w='full'>
          {/* Logo */}
          <Flex
            gap={4}
            w='full'
            alignItems='center'
            justifyContent='space-between'
            flexDirection={collapse ? 'row' : 'column'}
          >
            <Box display='flex' alignItems='center' gap={2}>
              <Icon as={TbPerfume} fontSize={30} color='#f5a41d' />
              {collapse && (
                <Text fontWeight='bold' fontSize={16}>
                  Perfume
                </Text>
              )}
            </Box>
          </Flex>
          {/* Navigation */}
          <List w='full' my={3}>
            {navbar.map(item => (
              <ListItem key={item.label}>
                <NavItem item={item} collapse={collapse} />
              </ListItem>
            ))}
          </List>
        </Box>
        <AvatarBox collapse={collapse} user={user!} />
      </Flex>
      {/* Main */}
      <Box as='main' w='full' h='full' border='1px' position='relative' borderRadius='2xl'>
        <Flex mx={4} mt={4} justifyContent='space-between'>
          <IconButton
            aria-label='Menu Collapse'
            icon={<MdMenu />}
            onClick={() => setCollapse(!collapse)}
          />
          <Box>
            <IconButton
              mr={3}
              aria-label='Change Theme'
              icon={colorMode === 'dark' ? <MdSunny /> : <MdOutlineDarkMode />}
              onClick={() => toggleColorMode()}
            />
            <Menu>
              <MenuButton as={Button}>{language.name}</MenuButton>
              <MenuList>
                {[
                  { lang: 'uz', name: 'Uz' },
                  { lang: 'ru', name: 'Ru' },
                  { lang: 'eng', name: 'Eng' },
                ].map(item => (
                  <MenuItem onClick={() => selectLang(item as Language)}>{item.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Box p={4}>{children}</Box>
      </Box>
    </HStack>
  )
}

export default BlankLayoutWithSidebar
