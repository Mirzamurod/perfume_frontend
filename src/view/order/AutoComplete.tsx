import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useFormContext, UseFieldArrayUpdate } from 'react-hook-form'
import { Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import {
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoComplete as ChakraAutoComplete,
} from '@choc-ui/chakra-autocomplete'
import { TOrderForm } from '@/types/order'
import { useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { getSearchProducts } from '@/store/product'

interface IProps {
  index: number
  update: UseFieldArrayUpdate<TOrderForm, 'perfumes'>
}

const AutoComplete: FC<IProps> = props => {
  const { index, update } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const debounceTimeout = useRef<NodeJS.Timeout | number | null>(null)
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TOrderForm>()

  const { searchProducts, searchIsLoading } = useAppSelector(state => state.product)

  console.log(searchProducts)
  console.log(search)

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current as number)
    }

    debounceTimeout.current = setTimeout(() => {
      if (search.trim() !== '') dispatch(getSearchProducts({ search }))
    }, 2000)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current as number)
    }
  }, [search])

  return (
    <Flex w='full'>
      <FormControl isRequired isInvalid={!!errors.perfumes?.[index]?.id?.message}>
        <FormLabel>Products</FormLabel>
        <ChakraAutoComplete openOnFocus isLoading={searchIsLoading}>
          <AutoCompleteInput
            value={search}
            placeholder={t('choose_product')}
            onChange={({ target }) => setSearch(target.value)}
            // {...register(`perfumes.${index}.id`)}
          />
          <AutoCompleteList>
            {searchProducts.map(product => (
              <AutoCompleteItem
                key={product._id}
                value={product._id}
                onClick={() => {
                  console.log(product.name)
                  setSearch(product.name)
                  update(index, { id: product._id, qty: watch(`perfumes.${index}.qty`) })
                }}
              >
                {product.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </ChakraAutoComplete>
        {errors.perfumes?.[index]?.id?.message ? (
          <FormErrorMessage>{t(errors.perfumes?.[index]?.id?.message as string)}</FormErrorMessage>
        ) : null}
      </FormControl>
    </Flex>
  )
}

export default AutoComplete
