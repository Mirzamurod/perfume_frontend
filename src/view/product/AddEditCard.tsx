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
import { TProductForm } from '@/types/product'

const AddEditCard = () => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext<TProductForm>()

  const inputs: TInputType[] = [
    { name: 'name', isRequired: true },
    { name: 'color', isRequired: true },
    { name: 'smell', isRequired: true },
    { name: 'persistence_of_the_smell', type: 'number', isRequired: true },
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
          <FormControl isInvalid={!!errors.type?.message} isRequired>
            <FormLabel>{t('type')}</FormLabel>
            <Select {...register('type')}>
              <option value='perfume'>{t('perfume')}</option>
              <option value='muskambar'>{t('muskambar')}</option>
            </Select>
            {errors.type?.message ? (
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={!!errors.season?.message} isRequired>
            <FormLabel>{t('season')}</FormLabel>
            <Select {...register('season')}>
              <option value='winter'>{t('winter')}</option>
              <option value='spring'>{t('spring')}</option>
              <option value='summer'>{t('summer')}</option>
              <option value='autumn'>{t('autumn')}</option>
            </Select>
            {errors.season?.message ? (
              <FormErrorMessage>{errors.season?.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={!!errors.gender?.message} isRequired>
            <FormLabel>{t('gender')}</FormLabel>
            <Select {...register('gender')}>
              <option value='boy'>{t('boy')}</option>
              <option value='girl'>{t('girl')}</option>
            </Select>
            {errors.gender?.message ? (
              <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
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
