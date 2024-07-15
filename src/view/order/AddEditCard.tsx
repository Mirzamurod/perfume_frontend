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
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Input from '@/components/Input'
import { TInputType } from '@/types/input'
import { TOrderForm } from '@/types/order'
import { useAppSelector } from '@/store'
import AutoComplete from './AutoComplete'

const AddEditCard = () => {
  const { t } = useTranslation()
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TOrderForm>()
  const { fields, prepend, update } = useFieldArray({ control, name: 'perfumes' })

  const {} = useAppSelector(state => state.product)

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
              <AutoComplete index={index} update={update} />
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
                    aria-label={t('add_product')}
                    borderLeftRadius={0}
                    onClick={() => prepend({ qty: 0, id: '' })}
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
    </Box>
  )
}

export default AddEditCard
