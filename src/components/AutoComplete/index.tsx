import { FC, Fragment, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  ListProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface IProps {
  options: { label: string; value: string | number }[]
  label: string
  placeholder?: string
  isRequired?: boolean
  inputValue: string | number
  setInputValue: (value: any) => void
}

const AutoComplete: FC<IProps & ListProps> = props => {
  const { options, label, placeholder, isRequired, inputValue, setInputValue } = props
  const { t } = useTranslation()
  const hoverbg = useColorModeValue('gray.100', 'gray.700')
  const listbg = useColorModeValue('white', 'gray.800')
  const boxRef = useRef<HTMLUListElement>(null)

  const handleFocus = () => {
    if (boxRef.current) boxRef.current.style.display = 'block'
  }

  const handleBlur = () => {
    if (boxRef.current) boxRef.current.style.display = 'none'
  }

  return (
    <Box>
      <FormControl isRequired={isRequired} position='relative'>
        <FormLabel>{t(label)}</FormLabel>
        <Input
          placeholder={t(placeholder ?? label)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          onClick={() => console.log('wor')}
          onChange={({ target }) => setInputValue(target.value)}
        />
        <List
          py={2}
          left={0}
          right={0}
          zIndex={3}
          maxH={200}
          ref={boxRef}
          display='none'
          overflow='auto'
          borderWidth={1}
          borderRadius={6}
          position='absolute'
          backgroundColor={listbg}
        >
          {options?.length ? (
            options?.map((item, index) => (
              <Fragment key={item.value}>
                <ListItem
                  as={Button}
                  py={1}
                  px={2}
                  w='100%'
                  borderRadius={0}
                  // _hover={{ bgColor: hoverbg, cursor: 'pointer' }}
                  onClick={() => {
                    handleFocus
                    console.log('hello')
                  }}
                >
                  <Text>{item.label}</Text>
                </ListItem>
                {options.length - 1 === index ? null : <Divider my={1} />}
              </Fragment>
            ))
          ) : (
            <ListItem py={1} px={2} _hover={{ bgColor: hoverbg }}>
              {t('no_data')}
            </ListItem>
          )}
        </List>
      </FormControl>
    </Box>
  )
}

export default AutoComplete
