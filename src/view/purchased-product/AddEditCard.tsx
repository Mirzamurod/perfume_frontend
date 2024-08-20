import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react'
import Input from '@/components/Input'
import { TInputType } from '@/types/input'
import { useAppSelector } from '@/store'
import { TPurchasedProductForm } from '@/types/purchasedProduct'

const AddEditCard = () => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext<TPurchasedProductForm>()

  const { products } = useAppSelector(state => state.product)

  const inputs: TInputType[] = [
    { name: 'count', type: 'number', isRequired: true },
    { name: 'purchased_price', type: 'number', isRequired: true },
    { name: 'sale_price', type: 'number', isRequired: true },
  ]

  return (
    <Box>
      <Grid
        templateColumns={{
          xl: 'repeat(3, 1fr)',
          lg: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          sm: 'repeat(2, 1fr)',
          base: 'repeat(1, 1fr)',
        }}
        gap={4}
      >
        <GridItem>
          <FormControl isInvalid={!!errors.product_id?.message} isRequired>
            <FormLabel>{t('choose_product')}</FormLabel>
            <Select {...register('product_id')}>
              <option value=''>{t('choose_product')}</option>
              {products.map(item => (
                <option value={item._id} key={item._id}>
                  {item.name} ({item.type}, {item.color})
                </option>
              ))}
            </Select>
            {errors.product_id?.message ? (
              <FormErrorMessage>{errors.product_id?.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </GridItem>
        {inputs.map(item => (
          <GridItem key={item.name}>
            <Input {...item} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default AddEditCard
