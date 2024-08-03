import { ReactNode, useState } from 'react'
import { useTranslation } from 'next-i18next'
import BlankLayout from '@/components/layout/BlankLayout'
import { Box, Button, ButtonGroup, Container, Grid, GridItem, Text } from '@chakra-ui/react'

const Payment = () => {
  const { t } = useTranslation()
  const [plan, setPlan] = useState<string>('monthly')

  return (
    <Box display='flex' width='100%' height='100vh' alignItems='center' justifyContent='center'>
      <Container pb={6} pt={2} maxW='container.sm'>
        <Box textAlign='center'>
          <Text fontSize='5xl' fontWeight={900}>
            Subscription Plans
          </Text>
          <Text fontWeight={600} mt={2} color='GrayText'>
            Upgrade to access, User Roles and Permissions, Mobile accessibility, Standard Customer
            support.
          </Text>
          <ButtonGroup mt={6} isAttached variant='outline'>
            {['monthly', 'annual'].map(text => (
              <Button
                colorScheme='teal'
                onClick={() => setPlan(text)}
                variant={text === plan ? 'solid' : 'outline'}
              >
                {t(text)}
              </Button>
            ))}
          </ButtonGroup>
          <Box mt={6}>
            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
              <GridItem h='10'>
                <Box border='1px' borderRadius={10}>
                  Hello
                </Box>
              </GridItem>
              <GridItem h='10'>
                <Box border='1px' borderRadius={10}>
                  World
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Text mt={4}>100% secure payment method with money back guarantee.</Text>
          <Button mt={2} display='block' width='100%' colorScheme='teal'>
            Upgrade now
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

Payment.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Payment.guestGuard = true

export default Payment
