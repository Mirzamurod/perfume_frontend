import { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input as ChakraInput,
  FormErrorMessage,
  Select,
  Text,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import Input from '@/components/Input'
import { TInputType } from '@/types/input'
import { TOrderForm } from '@/types/order'
import { useAppSelector } from '@/store'

const AddEditCard = () => {
  const { t } = useTranslation()
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TOrderForm>()
  const { fields, append, remove } = useFieldArray({ control, name: 'perfumes' })

  const { purchased_products } = useAppSelector(state => state.purchased_product)

  const inputs: TInputType[] = [
    { name: 'name', isRequired: true },
    { name: 'phone', isRequired: true },
  ]

  return (
    <Box>
      <Grid
        templateColumns={{
          sm: 'repeat(2, 1fr)',
          base: 'repeat(1, 1fr)',
        }}
        gap={4}
      >
        {inputs.map(item => (
          <GridItem key={item.name}>
            <Input {...item} />
          </GridItem>
        ))}
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <GridItem>
              <FormControl isInvalid={!!errors.perfumes?.[index]?.id?.message} isRequired>
                <FormLabel>{t('choose_product')}</FormLabel>
                <Select {...register(`perfumes.${index}.id`)}>
                  <option value=''>{t('choose_product')}</option>
                  {purchased_products.map(item => (
                    <option value={item.product._id} key={item._id}>
                      {item.product.name} ({item.count})
                    </option>
                  ))}
                </Select>
                {errors.perfumes?.[index]?.id?.message ? (
                  <FormErrorMessage>{errors.perfumes?.[index]?.id?.message}</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired isInvalid={!!errors.perfumes?.[index]?.qty?.message}>
                <FormLabel>{t('quantity')}</FormLabel>
                <Flex>
                  <ChakraInput
                    type='number'
                    borderRightRadius={0}
                    placeholder={t('quantity')}
                    {...register(`perfumes.${index}.qty`, { valueAsNumber: true })}
                  />
                  <IconButton
                    icon={<AddIcon />}
                    colorScheme='green'
                    variant='outline'
                    aria-label={t('add_product')}
                    borderRadius={0}
                    onClick={() => append({ qty: 0, id: '' })}
                  />
                  <IconButton
                    icon={<MinusIcon />}
                    colorScheme='red'
                    variant='outline'
                    aria-label={t('add_product')}
                    borderLeftRadius={0}
                    onClick={() => remove(index)}
                  />
                </Flex>
                {errors.perfumes?.[index]?.qty?.message ? (
                  <FormErrorMessage>
                    {t(errors.perfumes?.[index]?.qty?.message as string)}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
          </Fragment>
        ))}
      </Grid>
      {!fields.length ? (
        <Flex mt={4} justifyContent='end' alignItems='center'>
          <Text color='red.400' mr={4}>{t('must_have_perfume')}</Text>
          <IconButton
            icon={<AddIcon />}
            size='sm'
            colorScheme='green'
            variant='outline'
            aria-label={t('add_product')}
            onClick={() => append({ qty: 0, id: '' })}
          />
        </Flex>
      ) : null}
    </Box>
  )
}

export default AddEditCard
