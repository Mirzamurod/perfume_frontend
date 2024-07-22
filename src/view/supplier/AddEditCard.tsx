import { useRouter } from 'next/router'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import Input from '@/components/Input'
import { TInputType } from '@/types/input'
import PasswordInput from '@/components/PasswordInput'

const AddEditCard = () => {
  const router = useRouter()

  const inputs: TInputType[] = [{ name: 'name' }, { name: 'phone', isRequired: true }]

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
        {inputs.map(item => (
          <GridItem key={item.name}>
            <Input {...item} />
          </GridItem>
        ))}
        <GridItem>
          <PasswordInput name='password' isRequired={router.query.addEdit === 'add'} />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AddEditCard
